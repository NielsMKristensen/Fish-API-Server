const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Lake = require("../models/Lake.model");
const User = require("../models/User.model")
const Permit = require("../models/Permit.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");

//POST /api/lakes creates a new Lake

//  POST /api/tasks  -  Creates a new task
router.post("/permit",isAuthenticated, (req, res, next) => {
    const { date, userId, LakeId  } = req.body;
    Permit.create({ date, requestedBy: userId , lake: LakeId })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });
  


module.exports = router;