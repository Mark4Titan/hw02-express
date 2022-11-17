const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/users.model");
const { authSchema } = require("../../models/validator");
const { paramsContact } = require("../helpers/params");

const { JWT_SECRET } = process.env;

async function register(req, res) {
  const { error } = authSchema.validate(req.body);
  if (error) throw new Error("!found");

  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const user = new User({ email, password: hashPassword });
  await user.save();
  const result = await updateTokenUser(user._id);

  return res.status(201).json({
    token: result.token,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
}

async function login(req, res) {   
  const { error } = authSchema.validate(req.body);
  if (error) throw new Error("!found");
  const { email, password } = req.body; 
  const user = await User.findOne({ email });
  if (!user) throw new Error("!found");
  const passwordDidNotMatch = await bcrypt.compare(password, user.password);
  if (!passwordDidNotMatch) throw new Error("!pasword");
  const result = await updateTokenUser(user._id);

  return res.status(200).json({
    token: result.token,
    user: {
      email,
      subscription: result.subscription,
    },
  });
}

async function logout(req, res, next) {
  const { owner } = await paramsContact(req);
  const result = await User.findByIdAndUpdate(
    { _id: owner },
    { token: null },
    { new: true }
  );
  if (result.token) throw new Error("!not closed");

  return res.status(204).json({ message: "No Content" });
}

async function current(req, res) {
  const { token, email, subscription } = await paramsContact(req);

  return res.status(200).json({
    token,
    user: { email, subscription },
  });
}

//
const updateTokenUser = async (_id) => {
  const token = await jwt.sign({ _id }, JWT_SECRET, { expiresIn: "15m" });
  const result = await User.findByIdAndUpdate(_id, { token }, { new: true });
  if (!result) throw new Error("!token");
  return result;
};

module.exports = {
  register,
  login,
  current,
  logout,
};
