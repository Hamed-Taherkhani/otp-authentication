require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { authRoute } = require("./src/routes/authRoute");

const app = express();

// Setup middlewares:
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Setup routes:
app.use("/user/auth", authRoute);

// Connect to mongodb database:
const URI = "mongodb://127.0.0.1:27017/travel-ticket";
mongoose
  .connect(URI)
  .then(() => {
    console.log("✅ Client connected to mongodb successfully.");

    // Run server
    app.listen(process.env.PORT, () => {
      console.log(
        `✅ Server running successfully on port ${process.env.PORT}.`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
