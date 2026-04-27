const mongoose = require("mongoose");

const signoutSchema = new mongoose.Schema({
    receiverName: {
        type: String,
        trim: true
    },
    receiptNumber: {
        type: String,
        trim: true
    },
    signoutTime: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
    },
    ninNumber: {
        type: String,
        trim: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle"
    },
    amountPaid: {
        type: Number
    },
    
})

module.exports = mongoose.model("Signout", signoutSchema);