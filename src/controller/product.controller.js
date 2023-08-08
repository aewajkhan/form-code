const express = require("express");
const router = express.Router();
const authenticate = require("../midleware/authentication");
const productModel = require("../models/product.model");
const authorisation = require("../midleware/authorise");


router.get("", async (req, resp) => {
  try {
    let productData = await productModel.find().lean().exec();
    return resp.status(200).send(productData);
  } catch (error) {
    return resp.status(200).send({
      message: error.message,
    });
  }
});

//if u r login then u can create the product...

router.post("", authenticate, async (req, resp) => {
  req.body.user_Id=req.loginData._id
  try {
    let productData = await productModel.create(req.body);
    return resp.status(200).send(productData);
  } catch (error) {
    return resp.status(200).send({
      message: error.message,
    });
  }
});


router.patch(
  "/:_id",
  authenticate,
  authorisation(["seller", "admin"]),
  async (req, resp) => {
    // req.body.user_Id=req.loginData._id
    try {
      let productData = await productModel.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      return resp.status(201).send(productData);
    } catch (error) {
      return resp.status(200).send({
        message: error.message,
      });
    }
  }
);



module.exports = router;
