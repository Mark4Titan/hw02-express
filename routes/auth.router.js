const express = require("express");
const authController = require("./api/auth");
const { tryCatchWrapper } = require("./helpers");

const authRouter = express.Router();

const errorNot = [
  {
    name: "MongoServerError",
    status: 409,
    message: "such a user exists",
  },
];

authRouter.post(
  "/register",
  tryCatchWrapper(authController.register, errorNot)
);

module.exports = {
  authRouter,
};
