const bcrypt = require("bcrypt");
const { User } = require("../../models/users.model");
const { authSchema } = require("../../models/validator");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = process.env

async function register(req, res, next) {
  const { error } = authSchema.validate(req.body);
  if (error) throw new Error("!length");

  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashPassword });
  await user.save();

  return res
    .status(201)
    .json({ user: { email, subscription: user.subscription } });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("!email");
  const passwordDidNotMatch = await bcrypt.compare(password, user.password);
  if (!passwordDidNotMatch) throw new Error("!pasword");

  const token = jwt.sign({ _id: user._id }, JWT_SECRET,  { expiresIn: "15m", });
  return res.status(200).json(token);
}

module.exports = {
  register,
  login,
};
