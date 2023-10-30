const Joi = require("joi");

const sendOtpSchema = Joi.object({
  email: Joi.string().email().required(),
}).required();

const validateOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
}).required();

module.exports = {
  sendOtpSchema,
  validateOtpSchema,
};
