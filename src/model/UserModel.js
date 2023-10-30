const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    min: 3,
    max: 50,
    default: "",
  },
  lastname: {
    type: String,
    min: 3,
    max: 50,
    default: "",
  },
  email: {
    type: String,
    validate: isEmail,
    required: true,
  },
  isMounted: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
