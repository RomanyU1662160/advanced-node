const Film = require("../../models/film");
const express = require("express");
const Transaction = require("mongoose-transactions");
const Director = require("../../models/director");
const { findById } = require("../../models/film");
const auth = require("../../middleware/auth");
const User = require("../../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const films = await Film.find().populate("director", "name email -_id");

    res.send(films);
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id).populate("director");

    res.send(film);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const transaction = new Transaction();
    const loggedUser = await User.findById(req.id);
    const director = await Director.findById(req.body.director);
    const id = transaction.insert("film", new Film(req.body));
    transaction.update(
      "director",
      req.body.director,
      {
        rentedFilms: director.rentedFilms + 1,
      },
      { new: true }
    );
    await transaction.run();

    const film = await Film.findById(id).populate("director");
    // const newFilm = new Film(req.body);
    // await newFilm.save();
    // res.send(newFilm);
    res.send(film);
  } catch (error) {
    await transaction.rollback().catch(console.error);
    await transaction.clean();
    res.status(500).send(error);
  }
});

module.exports = router;
