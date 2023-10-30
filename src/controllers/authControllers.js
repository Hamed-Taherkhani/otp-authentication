const { generateOTP } = require("../utilities/generateOTP");
const { sendOTPEmail } = require("../lib/nodemailer");
const { genToken } = require("../lib/jsonWebToken");
const { UserModel } = require("../model/UserModel");
const { OTPModel } = require("../model/OTPModel");
const bcrypt = require("bcrypt");

// Step 1 of OTP authentication
// Where OTP created -> store in database -> send to user email
module.exports.send_otp_post = async (req, res) => {
  const { email } = req.body;

  // Generate OTP for email
  const otp = generateOTP();

  // Save OTP to database
  try {
    await OTPModel.create({ email, otp });
    await sendOTPEmail(email, otp);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong on server! please try again" });
  }

  res.json({ message: "OTP was sent to email. Please check your email." });
};

// Step 2 of OTP authentication
// Where check received OTP matching with email then Token created and send to client
module.exports.validate_otp_post = async (req, res) => {
  const { email, otp } = req.body;

  // Try to find email on otp collection
  try {
    const foundDoc = await OTPModel.findOne({ email });

    // If email exists on otp collection
    if (foundDoc) {
      // Compare OTP matching with stored OTP
      const isMatched = await bcrypt.compare(otp, foundDoc.otp);

      // If OTP match with stored password
      if (isMatched) {
        // Check that OTP expired or not
        const expireDate = new Date(
          foundDoc.createdAt.getTime() +
            Number(process.env.OTP_EXPIRE_TIME) * 1000
        );

        // If OTP is valid
        if (Date.now() < expireDate.getTime()) {
          // Find user from database to make sure user is new or registered before
          const registeredUserDoc = await UserModel.findOne({ email });
          let newUser = null;

          // If was not registered before
          if (!registeredUserDoc) {
            // Register new user and store on database
            newUser = await UserModel.create({ email });
          }

          // Create token
          const token = genToken({
            _id: registeredUserDoc?._id || newUser?._id,
          });

          // Setup token on response message cookie
          res.cookie("token", token, {
            maxAge: Number(process.env.JWT_EXPIRE_TIME) * 1000,
            httpOnly: true,
          });

          return res.status(200).json({
            message: registeredUserDoc
              ? "Hi, Successfully logged in to system"
              : "Hi, Successfully new account created",
          });
        } else {
          return res.status(400).json({
            message: "OTP code expired!\n Please try to get new one",
          });
        }
      } else {
        return res.status(400).json({
          message:
            "Wrong OTP! \n You can try just for few times then block for minutes.",
        });
      }
    } else {
      // Return forbidden message to client
      return res.status(404).json({
        message:
          "There is no OTP code or may be expired! \nPlease try to create OTP first",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong on server! \nPlease try again" });
  }
};
