const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken");
require("dotenv").config();
const regModel = require("../models/reg.model");
const generateToken = (regData) => {
  return jwt.sign({ regData }, process.env.secretKey);
};

router.get("", async (req, resp) => {
  try {
    let regData = await regModel.find().lean().exec();

    return resp.status(200).send(regData);
  } catch (error) {
    return resp.status(500).send({
      message: error.message,
    });
  }
});
router.post("", async (req, resp) => {
  try {
    let regData = await regModel.create(req.body);
    const token = generateToken(regData);
    return resp.status(200).send({ regData, token });
  } catch (error) {
    return resp.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
