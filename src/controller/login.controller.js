const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const regModel = require("../models/reg.model");
// console.log(process.env.secretKey)
const generateToken = (loginData) => {
  return jwt.sign({ loginData },process.env.secretKey );
};
router.post("", async (req, resp) => {
  try {
    let loginData = await regModel.findOne({ Email: req.body.Email });
    if (!loginData) {
      return resp.status(400).send({
        message: "Email or password are incorrect",
      });
    }
    const match = loginData.checkPassword(req.body.password);
    if (!match) {
      return resp
        .status(400)
        .send({ message: "Email or password are incorrect" });
    }
    const token = generateToken(loginData);
    return resp.status(200).send({ loginData, token });
  } catch (error) {
    return resp.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
