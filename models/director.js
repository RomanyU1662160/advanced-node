const mongoose = require("mongoose");
const DirectorSchema = require("../schemas/directorSchema");

const Director = mongoose.model("director", DirectorSchema);

module.exports = Director;
