const express = require("express");
const authController = require("./api/auth");
const { tryCatchWrapper } = require("./helpers/helpers");
const { errorNotebook } = require("./notebook/users.error.notebook");
const { check } = require("./middelewares/authorization.check");
const authVerify = require("./middelewares/authVerify");
const { checkErrorNotebook } = require("./notebook/check.error.notebook");
const imageOperator = require("./middelewares/image.operator");
const publicController = require("./api/public");

const authRouter = express.Router();

authRouter.post(
  "/register",
  tryCatchWrapper(authController.register, errorNotebook),
);
authRouter.post(
  "/verify",
  tryCatchWrapper(authVerify.reVerificationRequest, errorNotebook)
);
authRouter.get(
  "/verify/:verificationToken",
  tryCatchWrapper(authVerify.verifEymail, errorNotebook)
);
authRouter.post(
  "/login",
  tryCatchWrapper(authController.login, errorNotebook));

authRouter.get(
  "/current",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(authController.current, errorNotebook)
);
authRouter.patch(
  "/avatars",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(imageOperator.uploade.single("avatar"), errorNotebook),
  tryCatchWrapper(imageOperator.imageJimp, errorNotebook),
  tryCatchWrapper(publicController.avatars, errorNotebook)
);
authRouter.post(
  "/logout",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(authController.logout, errorNotebook)
);

module.exports = {
  authRouter,
};
