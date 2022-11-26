const errorNotebook = [
  {
    messIn: "duplicate key error collection",
    status: 409,
    message: "such a user exists",
  },
  {
    messIn: "!duplicate",
    status: 409,
    message: "Email in use",
  },
  {
    messIn: "!pasword",
    status: 401,
    message: "Email or password is wrong",
  },
  {
    messIn: "!token",
    status: 401,
    message: "failed to add token",
  },
  {
    messIn: "!found",
    status: 404,
    message: "Not Found",
  },
  {
    messIn: "!avatarURL",
    status: 400,
    message: "Bad Request",
  },
  {
    messIn: "!email",
    status: 400,
    message: "missing required field email",
  },
  {
    messIn: "!usFound",
    status: 404,
    message: "User not found",
  },
  {
    messIn: "Cannot read properties of undefined",
    status: 400,
    message: "Bad Request",
  },
  {
    messIn: "!verificationToken",
    status: 400,
    message: "Bad Request",
  },
  {
    messIn: "!verify",
    status: 400,
    message: "Verification has already been passed",
  },
  {
    messIn: "!notVerify",
    status: 400,
    message: "The mail has not yet been verified",
  },
];

module.exports = {
  errorNotebook,
};