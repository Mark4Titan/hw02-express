const { createError } = require("../helpers");
const {
  contactsSchema,
  contactsChangeSchema,
  favoriteSchema,
} = require("../../models/validator");

const { Contact } = require("../../models/contacts.model");

async function getAll(req, res, next) {
  const result = await Contact.find();

  return res.status(200).json(result);
}

async function findOneById(req, res, next) {
  const { id } = await paramsContact(req);

  const result = await Contact.findById(id);
  if (!result) return next(createError());

  return res.status(200).json(result);
}

async function create(req, res, next) {
  const { body } = await paramsContact(req);

  const { error } = contactsSchema.validate(body);
  if (error)
    return next(createError(400, "missing required name field"));  
  const result = await Contact.create(body);

  return res.status(201).json(result);
}

async function deleteById(req, res, next) {
  const { id } = await paramsContact(req);

  const result = await Contact.findByIdAndDelete(id);
  if (!result) return next(createError());

  return res.status(200).json({ message: "contact deleted" });
}

async function updateById(req, res, next) {
  const { id, body } = await paramsContact(req);

  const { error } = contactsChangeSchema.validate(body);
  if (error) return res.status(404).json({ message: "missing fields" });
  const result = await updateStatusContact(id, body);
  if (!result) return next(createError());

  return res.status(200).json(result);
}

async function favoriteUpdate(req, res, next) {
  const { id, body } = await paramsContact(req);

  const { error } = favoriteSchema.validate(body);
  if (error) return next(createError(400, "missing field favorite"));
  const result = await updateStatusContact(id, body);
  if (!result) return next(createError());

  return res.status(200).json(result);
}


const updateStatusContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};
const paramsContact = async (req) => {
  return await { id: req.params.id, body: req.body };
};

module.exports = {
  getAll,
  findOneById,
  create,
  deleteById,
  updateById,
  favoriteUpdate,
};
