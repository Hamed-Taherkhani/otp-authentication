const { rateLimit } = require("express-rate-limit");

const sendOtpLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
});

const validateOtpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  sendOtpLimiter,
  validateOtpLimiter,
};
