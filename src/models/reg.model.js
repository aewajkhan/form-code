const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const regSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Email: { type: String, required: true },
    password: { type: String, required: true },
      role:[{type:String}],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//its use for hashing the password......asyncronous type..
regSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  return next();
});

// its use for checking the password.....
regSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const regModel = mongoose.model("regdatas", regSchema);
module.exports = regModel;
