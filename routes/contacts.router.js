const express = require("express");
const contactController = require("./api/contacts");
const { tryCatchWrapper } = require("./helpers");

const contactsRouter = express.Router();

const errorNot = [
  {
    messIn: "Cast to ObjectId failed",
    status: 400,
    message: "incorrect request",
  },
];


contactsRouter.get("/", tryCatchWrapper(contactController.getAll, errorNot));
contactsRouter.get("/:id", tryCatchWrapper(contactController.findOneById, errorNot));
contactsRouter.post("/", tryCatchWrapper(contactController.create, errorNot));
contactsRouter.delete("/:id", tryCatchWrapper(contactController.deleteById, errorNot));
contactsRouter.put("/:id", tryCatchWrapper(contactController.updateById, errorNot));
contactsRouter.patch("/:id/favorite", tryCatchWrapper(contactController.favoriteUpdate, errorNot)
);


module.exports = {
  contactsRouter,
};