const express = require("express");
const contactController = require("./api/contacts");
const { tryCatchWrapper } = require("./helpers/helpers");
const { errorNotebook } = require("./notebook/contacts.error.notebook");
const { checkErrorNotebook } = require("./notebook/check.error.notebook");
const { check } = require("../routes/middelewares/authorization.check");

const contactsRouter = express.Router();

contactsRouter.get(
  "/",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(contactController.getAll, errorNotebook)
);
contactsRouter.get(
  "/:id",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(contactController.findOneById, errorNotebook)
);
contactsRouter.post(
  "/",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(contactController.create, errorNotebook)
);
contactsRouter.delete(
  "/:id",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(contactController.deleteById, errorNotebook)
);
contactsRouter.put(
  "/:id",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(contactController.updateById, errorNotebook)
);
contactsRouter.patch(
  "/:id/favorite",
  tryCatchWrapper(check, checkErrorNotebook),
  tryCatchWrapper(contactController.favoriteUpdate, errorNotebook)
);

module.exports = {
  contactsRouter,
};
