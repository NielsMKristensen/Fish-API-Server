const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Lake = require("../models/Lake.model");
const User = require("../models/User.model")
const Permit = require("../models/Permit.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");



//  POST /api/permit  -  Creates a new fishing permit
router.post("/permit",isAuthenticated, (req, res, next) => {
    const { date, userId, lakeId  } = req.body;
    Permit.create({ date, requestedBy: userId , lake: lakeId })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

  // //get permit iteration 2
  // router.get("/permit/:userId", isAuthenticated, (req, res, next) => {
  //   const { userId } = req.params;

  //   if (!mongoose.Types.ObjectId.isValid(userId)) {
  //       res.status(400).json({ message: "Specified id is not valid" });
  //       return;
  //     }
  //     hertil
  //   Permit.findById(lakeId)
  //     .populate("ownerEmail")
  //     .then((lake) => res.status(200).json(lake))
  //     .catch((err) => res.json(err));
  // });



module.exports = router;