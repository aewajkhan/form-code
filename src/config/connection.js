const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect("mongodb://0.0.0.0:27017/newregister");
};
