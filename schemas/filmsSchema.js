const mongoose = require("mongoose");
const GenreSchema = require("./genresSchema");

const FilmSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 160,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: Date.now().year,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRental: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },

  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "director",
  },
  genre: {
    type: GenreSchema,
    required: false,
  },
});

module.exports = FilmSchema;
