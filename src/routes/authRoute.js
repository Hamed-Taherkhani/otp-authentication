const { Router } = require("express");
const authControllers = require("../controllers/authControllers");
const { validateDataStruct } = require("../middleware/validateDataStructMW");
const { sendOtpSchema, validateOtpSchema } = require("../schema/otpAuthSchema");
const {
  sendOtpLimiter,
  validateOtpLimiter,
} = require("../lib/expressRateLimit");

const route = Router();

// Step 1 of OTP authentication
// Where OTP created -> store in database -> send to user email
route.post(
  "/send-otp",
  sendOtpLimiter,
  validateDataStruct(sendOtpSchema),
  authControllers.send_otp_post
);

// Step 2 of OTP authentication
// Where check received OTP matching with email then Token created and send to client
route.post(
  "/validate-otp",
  validateOtpLimiter,
  validateDataStruct(validateOtpSchema),
  authControllers.validate_otp_post
);

module.exports = {
  authRoute: route,
};
