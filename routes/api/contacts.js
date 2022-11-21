const {
  contactsSchema,
  contactsChangeSchema,
  favoriteSchema,
} = require("../../models/validator");

const { Contact } = require("../../models/contacts.model");
const { paramsContact } = require("../helpers/params");

async function getAll(req, res) {
  const { owner } = await paramsContact(req);
  const result = await Contact.find({ owner });

  return res.status(200).json(result);
}

async function findOneById(req, res) {
  const { _id, owner } = await paramsContact(req);
  const result = await validatorDB(_id, owner);

  return res.status(200).json(result);
}

async function create(req, res) {
  const { body, owner } = await paramsContact(req);

  const { error } = contactsSchema.validate(body);
  if (error) throw new Error("!validation");
  body.owner = owner;
  const result = await Contact.create(body);

  return res.status(201).json(result);
}

async function deleteById(req, res) {
  const { _id, owner } = await paramsContact(req);

  await validatorDB(_id, owner);
  const result = await Contact.findByIdAndDelete(_id);
  if (!result) throw new Error("!found");

  return res.status(200).json({ message: "contact deleted" });
}

async function updateById(req, res) {
  const { _id, body, owner } = await paramsContact(req);
  
  const { error } = contactsChangeSchema.validate(body);
  if (error) throw new Error("!missing");
  await validatorDB(_id, owner);
  const result = await updateStatusContact(_id, body);

  return res.status(200).json(result);
}

async function favoriteUpdate(req, res) {
  const { _id, body, owner } = await paramsContact(req);

  const { error } = favoriteSchema.validate(body);
  if (error) throw new Error("!favorite");
  await validatorDB(_id, owner);
  const result = await updateStatusContact(_id, body);

  return res.status(200).json(result);
}

//
const updateStatusContact = async (_id, body) => {
  return await Contact.findByIdAndUpdate(_id, body, { new: true });
};

const validatorDB = async (_id, owner) => {
  const [result] = await Contact.find({ _id, owner });
  if (!result) throw new Error("!found");
  return result;
};

module.exports = {
  getAll,
  findOneById,
  create,
  deleteById,
  updateById,
  favoriteUpdate,
};
