const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text, html) => {
  let mailDetails = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject,
    text,
    html,
  };

  await mailTransporter.sendMail(mailDetails);
};

const sendOTPEmail = async (to, otp) => {
  await sendEmail(
    to,
    "Service login OTP code",
    undefined,
    `<head>
      <meta charset="UTF-8" />
      <title>Login Login</title>
      <style>
        * {
          padding: 0;
          margin: 0;
          font-family: sans-serif;
          font-size: 1rem;
        }
      </style>
    </head>
   <body dir="ltr">
    <div
      style="
        max-width: 480px;
        width: 100%;
        margin: auto;
        border: 1px solid #00000010;
      "
    >
      <div
        style="
          text-align: center;
          background-color: #4285f4;
          padding: 2rem;
          color: white;
        "
      >
        <h1 style="font-size: 1.8rem; margin-bottom: 0.5rem">Travel Ticket</h1>
        <h2>Login OTP</h2>
      </div>
      <div style="padding: 2rem">
        <p style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem">
          Hi dear
        </p>
        <p>Your OTP code is:</p>
        <p>Do not share with someone else</p>
        <p style="text-align: center">
          <strong
            style="
              font-size: 1.5rem;
              display: inline-block;
              background-color: #e8e8e8;
              padding: 0.6rem 1.5rem;
              border-radius: 5px;
              margin: 2rem 0;
            "
            >${otp}</strong
          >
        </p>
        <p style="margin-top: 1rem; color: #494949; font-size: 0.9rem">
          If the request does not come from you, disregard this message
        </p>
      </div>
    </div>
   </body>  
    `
  );
};

module.exports = { sendEmail, sendOTPEmail };
