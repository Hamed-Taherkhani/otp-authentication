const Jwt = require("jsonwebtoken");

const genToken = (payload) => {
  return Jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRE_TIME),
  });
};

module.exports = {
  genToken,
};
