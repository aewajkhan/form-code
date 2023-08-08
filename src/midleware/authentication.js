const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    let decoded = jwt.verify(
      token,
      process.env.secretKey,
      (err, decoded) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(decoded);
        }
      }
    );
  });
};

const authenticate = async (req, resp, next) => {
  if (!req.headers.authorization) {
    return resp.status(400).send({
      message: "Authorization token not found",
    });
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return resp.status(400).send({
      message: "Authorization token not found",
    });
  }
  const token = req.headers.authorization.trim().split(" ")[1];
  let decoded;
  try {
      decoded= await verifyToken(token)
  } catch (error) {
     return resp.status(400).send({
         message: "Authorization token not found",
       });
  }
  console.log(decoded)
  req.loginData = decoded.loginData;
  next();
};

module.exports = authenticate;
