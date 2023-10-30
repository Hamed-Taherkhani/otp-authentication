const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: Number(process.env.OTP_EXPIRE_TIME),
  },
});

// encrypt otp code before saving on database
OTPSchema.pre("save", async function (next) {
  const plainText = this.otp;

  // Hash plain text
  const salt = await bcrypt.genSalt(10);
  const cipherText = await bcrypt.hash(plainText, salt);

  this.otp = cipherText;

  next();
});

const OTPModel = mongoose.model("OTP", OTPSchema);

module.exports = { OTPModel };
