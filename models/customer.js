const CustomerSchema = require("../schemas/customerSchema");
const mongoose = require("mongoose");

const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;
