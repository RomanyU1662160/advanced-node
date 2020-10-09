const mongoose = require("mongoose");

const GenreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
  },
});

module.exports = GenreSchema;
