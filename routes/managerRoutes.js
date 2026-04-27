const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isManager } = require("../middleware/auth")


const Battery = require("../models/BatteryRegistration");
const BatteryTransaction = require("../models/BatteryTransaction");
const Tyre = require("../models/TyreTransaction");


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

router.get("/registerBattery", isManager, (req, res) => {
    res.render("battery");
});

router.post("/registerBattery", upload.single('batteryImage'), isManager, async (req, res) => {
    console.log("reached here");
    try {
        const newBattery = new Battery(req.body);
        newBattery.batteryImage = req.file.path
        console.log(newBattery);
        await newBattery.save();
        res.redirect("/manager");
    } catch (error) {
        console.error(error);
        res.render("battery");
    }
});

router.get("/manager", isManager, async (req, res) => {
    try {
        let batteries = await Battery.find({status: "Available"}).sort({ natural: -1 })


        // let totalAmountBatteries = await Battery.aggregate( [
        //     {
        //         $group: {
        //             _id: "$all",
        //             totalAmount: {$sum: "$amountPaid"}
        //         }
        //     }
        // ]
        // )

        res.render("manager", { batteries, 
            // batteriesTotal: totalAmountBatteries[0]
         })

    } catch (error) {
        console.log(error)
        res.status(400).send("Unable to find manager in the Database.")
    }
})


router.get("/tyreServices", (req, res) => {
    res.render("tyre");
});

router.post("/tyreServices", async (req, res) => {
    console.log("reached here");
    try {
        const newTyre = new Tyre(req.body);
        console.log(newTyre);
        await newTyre.save();
        res.redirect("/tyreServices");
    } catch (error) {
        console.error(error);
        res.render("tyre");
    }
});

router.get("/batteryServices", async (req, res) => {
    try {
        const availableBatteries = await Battery.find({ status: "Available" })
        res.render("batteryTransaction", { availableBatteries });
    } catch (error) {
        console.error(error.message)
    }

});

router.post("/batteryServices", async (req, res) => {
    try {
        //Save new Transaction in the Battery Transaction Model
        const newBatteryTransaction = new BatteryTransaction(req.body);
        await newBatteryTransaction.save();


        //Update Battery status in the database.
        const newBatteryStatus = req.body.transactionType === "Sale" ? "Sold" : "Hired"
        await Battery.findByIdAndUpdate(req.body.batteryId, { status: newBatteryStatus })
        res.redirect("/manager");
    } catch (error) {
        console.error(error);
        res.render("batteryTransaction");
    }
});


module.exports = router;