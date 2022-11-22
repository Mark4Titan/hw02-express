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

];

module.exports = {
  errorNotebook,
};