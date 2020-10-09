const mongoose = require("mongoose");
const RentalSchema = require("../schemas/rentalSchema");

const Rental = mongoose.model("rental", RentalSchema);

module.exports = Rental;
