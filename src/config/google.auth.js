const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const regModel = require("../models/reg.model");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
uuidv4();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, callback) {
      //
      let loginData = await regModel
        .findOne({ email: profile?._json?.email })
        .lean()
        .exec();
      if (!loginData) {
        loginData = await regModel.create({
          firstname: profile._json.family_name,
          Lastname: profile._json.name,
          Email: profile._json.email,
          password: uuidv4(), //some random string...
          role: ["customer"],
        });
      }
      console.log(loginData)
      return callback(null, loginData);
    }
  )
);

module.exports = passport;
