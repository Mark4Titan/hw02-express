const paramsContact = (req) => {
  const result = {
    _id: req.params.id,
    body: req.body,
    owner: req.user._id,
    token: req.user.token,
    email: req.user.email,
    subscription: req.user.subscription,
    file: req.file,
  };
  if (!result) throw new Error("!found");
  return result;  
};
const paramsUser= (req) => {
  const result = {
    _id: req.user._id,
    token: req.user.token,
    email: req.user.email,
    subscription: req.user.subscription,
    filePath: req.file.path,
    avatarURL: req.file.filename,
    filename: req.file.filename,
  };
  if (!result) throw new Error("!found");
  return result;  
};
module.exports = {
  paramsContact,
  paramsUser,
};
