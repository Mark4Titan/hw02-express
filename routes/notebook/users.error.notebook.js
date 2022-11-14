const errorNotebook = [
  {
    messIn: "duplicate key error collection",
    status: 409,
    message: "such a user exists",
  },
  {
    messIn: "!email",
    status: 401,
    message: "user does not exist",
  },
  {
    messIn: "!pasword",
    status: 401,
    message: "Email or password is wrong",
  },
  {
    messIn: "!length",
    status: 400,
    message: "the request data is not correct",
  },
  {
    messIn: "!token",
    status: 401,
    message: "failed to add token",
  },
];

module.exports = {
  errorNotebook,
};