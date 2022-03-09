// Iteration 2 routes here might be in the auth routes.
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model");





router.get("/user/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    User.findById(userId)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.json(err));
  });

  module.exports = router;