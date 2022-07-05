const mongoose = require("mongoose");
const CustomerSchema = mongoose.Schema({
  fname: {
    type: String,
    trim: true
    // minLength: 3,
    // maxLength: 50,
    // required: true
  },
  lname: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
    required: true
  },
  email: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 150,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 20,
    required: true
  },
  isGold: {
    type: Boolean,
    default: false,
    required: false
  }
});
module.exports = CustomerSchema;
