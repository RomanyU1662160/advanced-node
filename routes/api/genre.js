const express = require("express");
const Genre = require("../../models/genre");
const asyncMiddleware = require("../../middleware/async");
const ValidateMongooseObjectId = require("../../middleware/validateMongooseId");
const auth = require("../../middleware/auth");
const genreValidation = require("../../validations/genreValidation");
const _ = require("lodash");
const router = express.Router();

// router.get(
//   "/",
//   asyncMiddleware(async (req, res) => {
//     const genres = await Genre.find();
//     genres.length > 0 ? res.send(genres) : res.send("no Genres found");
//   })
// );
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    genres.length > 0 ? res.send(genres) : res.send("no Genres found");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).send(" Genre not found");
    }
    res.send(genre);
  })
);

router.post("/", auth, async (req, res) => {
  const { error, value } = genreValidation.validate({
    name: req.body.name,
  });
  if (error) return res.status(400).send(error.message);

  const newGenre = new Genre(_.pick(req.body, "name"));

  await newGenre.save();
  return res.send(newGenre);
  try {
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
