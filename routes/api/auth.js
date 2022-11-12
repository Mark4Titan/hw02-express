const bcrypt = require("bcrypt")
const { User } = require("../../models/users.model");
const { authSchema } = require("../../models/validator");
const { createError } = require("../helpers");


async function register(req, res, next) {
  const { error } = authSchema.validate(req.body);
  if (error) return next(createError(400, "the request data is not correct"));

  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  
  const user = new User({ email, password: hashPassword });
  await user.save();

  return res
    .status(201)
    .json({ user: { email, subscription: user.subscription } });
}

module.exports = { register };
