const errorNotebook = [
  {
    messIn: "Cast to ObjectId failed",
    status: 400,
    message: "incorrect request",
  },
  {
    messIn: "!found",
    status: 404,
    message: "Not Found",
  },
  {
    messIn: "missing",
    status: 404,
    message: "missing fields",
  },
  {
    messIn: "!validation",
    status: 400,
    message: "missing required name field",
  },
  {
    messIn: "!favorite",
    status: 400,
    message: "missing field favorite",
  },
];

module.exports = {
  errorNotebook,
};
