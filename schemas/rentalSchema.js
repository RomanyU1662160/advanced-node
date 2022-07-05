const mongoose = require("mongoose");

const RentalSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "film",
    required: true
  },
  rentalDate: {
    type: Date,
    required: false,
    default: Date.now()
  },
  expiryDate: {
    type: Date
  },
  fee: {
    type: Number,
    min: 0
  }
});
module.exports = RentalSchema;
