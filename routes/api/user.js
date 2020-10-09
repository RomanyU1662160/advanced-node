const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const User = require("../../models/user");
const UserValidationSchema = require("../../validations/userValidation");
const validateComplexity = require("../../helpers/passwordComplexity");
const hashPassword = require("../../helpers/hashPasswords");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    users.length > 0 ? res.send(users) : res.send("no directors found ");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    console.log(req.id);
    const user = await User.findById(req.id).select("-password");
    user ? res.send(user) : res.send("user is not found ");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    // exclude user malicious inputs when user submit the form
    const newUser = new User(
      _.pick(req.body, ["fname", "lname", "email", "password", "isAdmin"])
    );

    // validate submission
    const { error, value } = UserValidationSchema.validate({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password
    });

    if (error) return res.status(400).send(error.message);

    // check password complexity
    const passwordComplexityError = validateComplexity(req.body.password);
    if (passwordComplexityError.error)
      return res.status(400).send(passwordComplexityError.error.message);
    // console.log("passwordComplexity :>> ", passwordComplexityError);

    // check if user is exist
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already Exists. ");
    const hashedPassword = await hashPassword(req.body.password);
    newUser.password = hashedPassword;

    // save user when validation passed
    await newUser.save();

    // generate Token
    const token = newUser.generateAuthToken();
    console.table({ JWT: token });
    res.header({ "x-auth-token": token }).send({
      loggedUser: _.pick(newUser, ["_id", "fname", "lname", "email"]),
      token
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
