const express = require("express");
const router = express.Router();
const { Favorites, Users } = require("../models");

module.exports = router;

router.post("/add", (req, res) => {
  const { value, email } = req.body;

  Users.findOne({
    where: { email },
  })

    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      Favorites.create({ code: value })
        .then((fav) => fav.setUser(user))
        .then((fav) => res.status(201).send(fav))
        .catch((err) => {
          console.error("Error associating favorite with user:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.error("Error searching for user:", err);
      res.status(500).send("Internal Server Error");
    });
});
