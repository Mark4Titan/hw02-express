const checkErrorNotebook = [
  {
    messIn: "jwt expired",
    status: 401,
    message: "the token has expired",
  },
  {
    messIn: "jwt malformed",
    status: 401,
    message: "Not authorized",
  },
  {
    messIn: "invalid signature",
    status: 401,
    message: "not a valid token",
  },
  {
    messIn: "!Unauthorized",
    status: 401,
    message: "Not authorized",
  },
  {
    messIn: "!user",
    status: 401,
    message: "the user was not found in the database",
  },
  {
    messIn: "!session",
    status: 401,
    message: "the session is closed",
  },
  {
    messIn: "!not closed",
    status: 401,
    message: "the session is not closed",
  },
];

module.exports = {
  checkErrorNotebook,
};
