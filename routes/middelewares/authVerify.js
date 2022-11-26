const { emailSchema } = require("../../models/validator");
const { User } = require("../../models/users.model");
const { mailSend } = require("../middelewares/mailSend");

async function verifEymail(req, res) {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) throw new Error("!usFound");
  if (!user.verificationToken) throw new Error("!verificationToken");
  if (user.verify)
    return res.status(201).json({ message: `mail: ${user.email} already verified!` });

  const result = await User.findByIdAndUpdate(
    { _id: user._id },
    { verify: true, verificationToken: null },
    { new: true }
  );
  if (!result) throw new Error("!verificationToken");

  return res.status(200).json({ message: "Verification successful" });
}

async function reVerificationRequest(req, res) {
  const { error } = emailSchema.validate(req.body);

  if (error) throw new Error("!email");
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("!usFound");
  if (user.verify) throw new Error("!verify");

  mailSend(email, user.verificationToken);

  return res.status(200).json({message: "Verification email sent"});
}

module.exports = {
  verifEymail,
  reVerificationRequest,
};
