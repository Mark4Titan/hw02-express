const express = require("express");
const authController = require("./api/auth");
const { tryCatchWrapper } = require("./helpers");
const { errorNotebook } = require("./users.error.notebook");

const authRouter = express.Router();

authRouter.post(
  "/register",
  tryCatchWrapper(authController.register, errorNotebook)
);
authRouter.post("/login", tryCatchWrapper(authController.login, errorNotebook));

module.exports = {
  authRouter,
};
