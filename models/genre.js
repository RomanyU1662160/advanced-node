const mongoose = require("mongoose");
const GenreSchema = require("../schemas/genresSchema");

const Genre = mongoose.model("genre", GenreSchema);

module.exports = Genre;
