const mongoose = require("mongoose");
const Customer = require("../../models/customer");
const express = require("express");
const CustomerValidationSchema = require("../../validations/customerValidation");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    customers.length > 0
      ? res.send(customers)
      : res.send("no directors found ");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const { error, value } = await CustomerValidationSchema.validateAsync({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email
    });
    console.log("validation", error);
    console.log("validation2", value);
    await newCustomer.save();
    res.send(newCustomer);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
