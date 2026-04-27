const mongoose = require('mongoose');
const tyreTransaction = new mongoose.Schema({
    numberPlate: {
        type: String,
    },
    serviceType: {
        type: String,
        enum: ["Pressure", "Puncture-fixing", "Valves"]
    },
    amountPaid: {
        type: Number
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Tyre", tyreTransaction);