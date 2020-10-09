const mongoose = require("mongoose");

const ValidateMongooseObjectId = (req, res, next) => {
  const id = req.params.id;
  console.log("id ::::::::::>>>", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid Id " });
    next();
  }
};
module.exports = ValidateMongooseObjectId;
