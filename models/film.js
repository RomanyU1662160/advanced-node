const FilmSchema = require("../schemas/filmsSchema");
const mongoose = require("mongoose");

const Film = mongoose.model("film", FilmSchema);

module.exports = Film;
