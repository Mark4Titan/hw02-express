const express = require("express");
// const {
//   usersSchema,
// } = require("../../models/validator");


const { User } = require("../../models/users.model");

const router = express.Router();



router.POST("/users/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    // return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
