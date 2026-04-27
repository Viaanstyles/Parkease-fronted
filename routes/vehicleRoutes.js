const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const multer = require("multer");
const { isAttendant } = require("../middleware/auth");
const calculateParkingFee = require("../utils/feeCalculator");


//Import model files
const Vehicle = require("../models/Vehicle_registration");
const Signout = require("../models/Signout")



//Image upload configurations
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage })


//Routing
router.get('/registerVehicle',(req, res) => {
    res.render('register-vehicle');
});

router.post('/registerVehicle', upload.single('vehicleImage'), async (req, res) => {
    try {
        const uniqueTicket = "Rcpt-" + crypto.randomBytes(3).toString("hex").toUpperCase();
        const newVehicle = new Vehicle({
            driverName: req.body.driverName,
            phoneNumber: req.body.phoneNumber,
            vehicleType: req.body.vehicleType,
            numberPlate: req.body.numberPlate,
            vehicleModel: req.body.vehicleModel,
            vehicleColor: req.body.vehicleColor,
            ninNumber: req.body.ninNumber,
            arrivalTime: req.body.arrivalTime,
            receiptNumber: uniqueTicket,
            vehicleImage: req.file.path
        })
        console.log(newVehicle)
        await newVehicle.save();
        res.redirect('/attendant')
    } catch (error) {
        console.error(error)
        res.render("register-vehicle")
    }

});





//Update vehicle routes
//Show the update form
router.get("/vehicles/update/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        if (!vehicle) return res.redirect("/vehicleList")
        res.render("updateVehicle", { vehicle })
    } catch (error) {
        res.status(400).send("Unable to find vehicle in the Database.")
    }
})

router.post("/vehicles/update/:id", async (req, res) => {
    try {
        await Vehicle.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/vehicleList")
    } catch (error) {
        res.status(400).send("Unable to update vehicle in the Database.")
    }
})

router.get("/signout", (req, res) => {
    res.render("signout")
})

router.post("/signout/verify", async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ receiptNumber: req.body.receiptNumber, status: "Parked" })
        if (!vehicle) {
            return res.render("signout")
        }
        const fee = calculateParkingFee(vehicle.vehicleType, vehicle.arrivalTime)
        res.render("signoutConfirm", { vehicle, fee })
    } catch (error) {
        res.render("signout")
    }
});

router.post("/signout/confirm", async (req, res) => {
    try {
        const newSignout = new Signout(req.body)
        const savedSignedout = await newSignout.save();
        await Vehicle.findByIdAndUpdate(req.body.vehicleId, {status: "Signed Out"});
        res.redirect(`/signout/receipt/${savedSignedout._id}`)
    } catch (error) {
        res.status(400).send("Failed to signout a vehicle.")
    }
});

router.get("/signout/receipt/:id", async (req, res) => {
    try {
        const record = await Signout.findById(req.params.id).populate("vehicleId")
        if(!record) {
            return res.redirect("/signout")
        }
        res.render("receipt", {record})
        
    } catch (error) {
        res.render("signout")
    }
});



module.exports = router;
