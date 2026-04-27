const mongoose = require('mongoose');
const batteryTransactionSchema = new mongoose.Schema({
    numberPlate: {
        type: String,
    },
    batteryId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Battery"
    },
    transactionType: {
        type: String,
        enum: ["Hire", "Sale"],
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model("BatteryTransaction", batteryTransactionSchema);