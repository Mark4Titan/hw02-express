const express = require("express");
const contactController = require("./api/contacts");
const { tryCatchWrapper } = require("./helpers");

const contactsRouter = express.Router();

contactsRouter.get("/", tryCatchWrapper(contactController.getAll));
contactsRouter.get("/:id", tryCatchWrapper(contactController.findOneById));
contactsRouter.post("/", tryCatchWrapper(contactController.create));
contactsRouter.delete("/:id", tryCatchWrapper(contactController.deleteById));
contactsRouter.put("/:id", tryCatchWrapper(contactController.updateById));
contactsRouter.patch("/:id/favorite", tryCatchWrapper(contactController.favoriteUpdate)
);


module.exports = {
  contactsRouter,
};