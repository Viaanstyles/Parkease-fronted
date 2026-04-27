const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Vehicle = require("../models/Vehicle_registration");
const Battery = require("../models/BatteryRegistration");
const Signout = require("../models/Signout");
const TyreTransaction = require("../models/TyreTransaction");
const BatteryTranction = require("../models/BatteryTransaction");
const { isAdmin, isAttendant, isManager } = require("../middleware/auth");

router.get("/manager", isManager, (req, res) => {
  res.render("manager");
});

router.get("/admin", async (req, res) => {
  try {
    let users = await Registration.find().sort({ $natural: -1 });

  // determine the selected dates, default to today if none provided
     const queryDate = req.query.date ? new Date(req.query.date) : new Date();
 
     // create start and end of selected day for mongodb querrying
     const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
     const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));
 
     // 1. query signed out vehicles for parking revenue
     const signedOutVehicles = await Signout.find({
       signoutTime: {
         $gte: startOfDay,
         $lte: endOfDay,
       },
     })
       .populate("vehicleId")
       .sort({ signoutTime: -1 });
 
     // Calculate parking revenue
     const parkingRevenue = signedOutVehicles.reduce((total, record) => {
       return total + (record.amountPaid || 0);
     }, 0);
 
     // 2. Query Tyre transactions
     const tyreTransactions = await TyreTransaction.find({
       transactionDate: {
         $gte: startOfDay,
         $lte: endOfDay,
       },
     });
 
     // Calculate Tyre revenue
     const tyreRevenue = tyreTransactions.reduce((total, record) => {
       return total + (record.amountPaid || 0);
     }, 0);
 
     // 3. Query Battery transactions
     const batteryTransactions = await BatteryTranction.find({
       transactionDate: {
         $gte: startOfDay,
         $lte: endOfDay,
       },
     });
 
     // Calculate Battery revenue
     const batteryRevenue = batteryTransactions.reduce((total, record) => {
       return total + (record.price || 0);
     }, 0);
     res.render("admin-dashboard", {
       selectedDate: startOfDay.toISOString().split("T")[0],
       signedOutVehicles,
       parkingRevenue,
       batteryRevenue,
       tyreRevenue,
       users
     });
   } catch (error) {
     console.error(error.message);
     res.status(401).send("Unable to get items from the db");
   }
   //   let users = await Registration.find().sort({ $natural: -1 });
 });

router.get("/signout", isAttendant, (req, res) => {
  res.render("vehicleSignout");
});

router.get("/attendant", async (req, res) => {
  try {
    let vehicles = await Vehicle.find({ status: "Parked" }).sort({
      $natural: -1,
    });
    res.render("attendant", { vehicles });
  } catch (error) {
    res.status(400).send("Unable to find attendant in the Database.");
  }
});

router.get("/usersList", isAdmin, async (req, res) => {
  try {
    let users = await Registration.find().sort({$natural: -1})
    res.render("usersList", {users});
  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
})

router.get("/users/update/:id", async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id);
    if (!user) return res.redirect("/usersList");
    res.render("updateUser", { user });
  } catch (error) {
    res.status(400).send("Unable to find user in the Database.");
  }
});

router.post("/users/update/:id", async (req, res) => {
  try {
    await Registration.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/usersList");
  } catch (error) {
    res.status(400).send("Unable to update user in the Database.");
  }
});

router.post("/users/delete", async (req, res) => {
  try {
    await Registration.deleteOne({ _id: req.body.id });
    res.redirect("/usersList");
  } catch (error) {
    res.status(400).send("Unable to delete users in the Database.");
  }
});

module.exports = router;