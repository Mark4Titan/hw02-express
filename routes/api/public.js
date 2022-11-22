const { User } = require("../../models/users.model");
const { paramsUser } = require("../helpers/params");

async function avatars(req, res) {
  const { _id, avatarURL } = paramsUser(req);

  const result = await User.findByIdAndUpdate(
    { _id },
    { avatarURL },
    { new: true }
  );
  if (!result) throw new Error("!avatarURL");

  return res.status(200).json({
    avatarURL: `/public/avatars/${result.avatarURL}`,
  });
}

module.exports = {
  avatars,
};
