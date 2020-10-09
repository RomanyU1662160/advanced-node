const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = mongoose.Schema({
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
    // unique: true,
    trim: true,
    minLength: 3,
    maxLength: 150,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 1024,
    required: true
  },
  isGold: {
    type: Boolean,
    default: false,
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateAuthToken = function (expiryTime = 360000) {
  const payload = {
    id: this.id,
    isAdmin: this.isAdmin
  };
  const secret = config.get("JWT_SECRET");

  const token = jwt.sign(payload, secret, { expiresIn: expiryTime });
  return token;
};

module.exports = UserSchema;
