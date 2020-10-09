const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const express = require("express");
const config = require("config");
const User = require("../../models/user");
const router = express.Router();

// update role
router.post("/role/:id", [auth, admin], async (req, res) => {
  const id = req.params.id;
  const isAdmin = req.isAdmin;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(401).send("User not found..");
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
