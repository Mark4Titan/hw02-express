const express = require("express");
const contactController = require("./api/contacts");
const { tryCatchWrapper } = require("./helpers");
const { errorNotebook } = require("./contacts.error.notebook");

const contactsRouter = express.Router();



contactsRouter.get("/", tryCatchWrapper(contactController.getAll, errorNotebook));
contactsRouter.get("/:id", tryCatchWrapper(contactController.findOneById, errorNotebook));
contactsRouter.post("/", tryCatchWrapper(contactController.create, errorNotebook));
contactsRouter.delete("/:id", tryCatchWrapper(contactController.deleteById, errorNotebook));
contactsRouter.put("/:id", tryCatchWrapper(contactController.updateById, errorNotebook));
contactsRouter.patch("/:id/favorite", tryCatchWrapper(contactController.favoriteUpdate, errorNotebook)
);


module.exports = {
  contactsRouter,
};