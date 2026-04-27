const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose').default || require('passport-local-mongoose')

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  role: {
    type: String
  }
});
registrationSchema.plugin(passportLocalMongoose, {usernameField: "email"})


module.exports = mongoose.model("Registration", registrationSchema);
