const mongoose = require("mongoose");

const DirectorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    enum: ["Mr", "Mrs", "Miss", "Dr", "Sir"],
    default: "Mr"
  },
  email: {
    type: String,
    required: true
  },
  rentedFilms: {
    type: Number,
    default: 0
  }
});

module.exports = DirectorSchema;
