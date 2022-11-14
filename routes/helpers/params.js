const paramsContact = async (req) => {
  const result = await {
    _id: req.params.id,
    body: req.body,
    owner: req.user._id,
    token: req.user.token,
    email: req.user.email,
    subscription: req.user.subscription,
  };
  if (!result) throw new Error("!found");
  return result;
};
module.exports = {
  paramsContact,
};
