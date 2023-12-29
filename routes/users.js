const express = require("express");
const router = express.Router();
const { validateAuth } = require("../config/middlewares/auth");
const { Users } = require("../models");
const { generateToken } = require("../config/tokens");

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(406);

  Users.findOne({
    where: { email },
  }).then((user) => {
    if (!user) return res.sendStatus(401);

    user.validatePassword(password).then((isOk) => {
      if (!isOk) return res.sendStatus(401);
      if (!user.isConfirmed)
        return res.status(401).send("Usuario no confirmado");
      const payload = {
        username: user.username,
        email,
        isConfirmed: user.isConfirmed,
      };
      const token = generateToken(payload);
      res.cookie("token", token).send(payload);
    });
  });
});

router.post("/register", (req, res) => {
  const { username, email, password, isConfirmed } = req.body;
  console.log("REQ.BODY -----------------------------> ", req.body);
  if (!email || !password || !username)
    return res.status(406).json({ error: "Did not fill out all the fields." });

  Users.findOne({ where: { email } }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ error: "The email is already registered." });
    }
    return Users.create({
      username,
      email,
      password,
      isConfirmed,
    })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
      });
  });
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
