const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const User = require("../../models/user");
const loginValidationSchema = require("../../validations/loginValidation");
const validateComplexity = require("../../helpers/passwordComplexity");
const hashPassword = require("../../helpers/hashPasswords");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

// validate login auth
router.post("/login", async (req, res) => {
  // 1- exclude user malicious inputs when user submit the form
  const { email, password } = _.pick(req.body, ["email", "password"]);

  //2- validate submission
  const { error, value } = loginValidationSchema.validate({
    email: req.body.email,
    password: req.body.password
  });
  if (error) return res.status(400).send(error.message);

  //-3 check if user with submitted email is exist
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("No user associated with this email ");
  //-4 check if submitted password is equal to user password
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched)
    return res.status(400).send("Submitted password is not correct");
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({ token, user });
});

module.exports = router;
