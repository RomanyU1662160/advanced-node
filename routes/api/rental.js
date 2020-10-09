const mongoose = require("mongoose");
const Rental = require("../../models/rental");
const express = require("express");
const Customer = require("../../models/customer");
const Film = require("../../models/film");
const Transaction = require("mongoose-transactions");

const router = express.Router();
const transaction = new Transaction();

router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find()
      .sort("-rentalDate")
      .populate("customer", "fname lname")
      .populate("film", "name year");

    rentals.length > 0 ? res.send(rentals) : res.send("no rentals found ");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const customer = await Customer.findById(req.body.customer);
    const film = await Film.findById(req.body.film);

    const newRental = new Rental(req.body);
    // create transaction for multi operations in documents
    const id = transaction.insert("rental", newRental);
    transaction.update(
      "film",
      req.body.film,
      {
        numberInStock: film.numberInStock - 1,
        dailyRental: film.dailyRental + 1
      },
      { new: true }
    );
    const rental = await transaction.run();

    console.log("film :>> ", film);
    const foundedRental = await Rental.findById(id)
      .populate("film")
      .populate("customer");
    res.send(foundedRental);
  } catch (error) {
    await transaction.rollback().catch(console.error);
    await transaction.clean();
    res.send(error);
  }
});

module.exports = router;
