const mongoose = require('mongoose');
const batteryRegistration = new mongoose.Schema({
    batteryType: {
        type: String,
    },

    batterySize: {
        type: String,
    },
    batteryImage: {
        type: String
    },
    amountPaid: {
        type: Number
    },
    status: {
        type: String,
        enum: ["Available", "Hired", "Sold"],
        default: "Available"
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Battery", batteryRegistration);