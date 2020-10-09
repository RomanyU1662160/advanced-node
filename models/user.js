const UserSchema = require("../schemas/userSchema");
const mongoose = require("mongoose");

const User = mongoose.model("user", UserSchema);

module.exports = User;
