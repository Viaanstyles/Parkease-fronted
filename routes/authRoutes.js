const express = require("express");
const router = express.Router();
const passport = require("passport")

//import database file/ import registration model
const Registration = require("../models/Registration");

router.get("/signup", (req, res) => {
  res.render("signUp");
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new Registration(req.body);
    await Registration.register(newUser, req.body.password);
    res.redirect("/admin");
  } catch (error) {
    console.error(error)
    res.send("Not able to send user to the database")
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login"
}), (req, res) => {
  if(req.user.role === "Admin") {
    res.redirect("/admin")
  } else if(req.user.role === "Manager") {
    res.redirect("/manager")
  } else if(req.user.role === "Attendant") {
    res.redirect("/attendant")
  } else {
    res.redirect("/");
  } 
});

router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if(err) { 
      return next(err); 
    }
    res.redirect("/login")
  })
})

module.exports = router;
