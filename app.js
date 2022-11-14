const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { createError } = require("./routes/helpers/helpers");
const { contactsRouter } = require("./routes/contacts.router");
const { authRouter } = require("./routes/auth.router");


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use("/", (req, res, next) => {
  return next(createError());
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({ message: err.message });
});

module.exports = app;
