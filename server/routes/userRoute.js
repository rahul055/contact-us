const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/", async (req, res) => {
  const { firstname, lastname, email, text } = req.body;
  if (!firstname || !lastname || !email || !text)
    return res.status(406).json("Please fill all the fields.");
  try {
    const newuser = await new User({
      name: `${firstname} ${lastname}`,
      email,
      text,
    });
    newuser.save();

    res.status(200).json(newuser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    User.find({})
      .sort({ createdAt: -1 })
      .exec(function (err, docs) {
        if (err) return res.status(500).json(err);
        res.status(200).json(docs);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
