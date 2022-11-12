const { User } = require("../../models/users.model");
const { authSchema } = require("../../models/validator");
const { createError } = require("../helpers");

async function register(req, res, next) {
  const { error } = authSchema.validate(req.body);
  if (error) return next(createError(400, "the request data is not correct"));
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();

  return res.status(201).json(user);
}

module.exports = { register };
