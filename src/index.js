const express = require("express");
const app = express();

const regController = require("./controller/reg.Controler");
const loginCOntroller = require("./controller/login.controller");
const productCOntoller = require("./controller/product.controller");
const passport= require("./config/google.auth")
app.use(express.json());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, resp) {
     try {
        // const token = generateToken(req. loginData);

        /////here loginDtaa issue see after some time............ 
        console.log(req.loginData)
      return resp.status(200).send({ userData: "req.loginData" });
    } catch (error) {
      return resp.status(500).send({
        message: error.message,
      });
    }
  
  }
);

app.use("/product", productCOntoller);
app.use("/login", loginCOntroller);
app.use("/register", regController);
module.exports = app;
