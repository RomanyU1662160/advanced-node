const mongoose = require("mongoose");
const Director = require("../../models/director");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const directors = await Director.find();
    directors.length > 0
      ? res.send(directors)
      : res.send("no directors found ");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    director ? res.send(director) : res.send("no director found ");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    director.rentedFilms++;
    await director.save();
    director ? res.send(director) : res.send("no director found ");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newDirector = new Director(req.body);
    await newDirector.save();
    res.send(newDirector);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
