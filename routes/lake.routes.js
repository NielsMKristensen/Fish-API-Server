const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Lake = require("../models/Lake.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//POST /api/lakes creates a new Lake

router.post("/lake", isAuthenticated, (req, res, next) =>{
    const {lakeName, street, city, lakePhoneNumber, lakeEmail, description, openingHours, prices, CVRnumber, pictureLinks, ownerEmail} = req.body;

    Lake.create ({lakeName, street, city, lakePhoneNumber, lakeEmail, description, openingHours, prices, CVRnumber, pictureLinks, ownerEmail})
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

//GET /api/lake get all the lakes.

router.get("/lake", isAuthenticated, (req, res, next) => {
    Lake.find()
      .populate("ownerEmail")
      .then((allLake) => res.json(allLake))
      .catch((err) => res.json(err));
  });

//GET /api/lake/:lakeId get specific lake based on id.

router.get("/lake/:lakeId", isAuthenticated, (req, res, next) => {
    const { lakeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(lakeId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    Lake.findById(lakeId)
      .populate("ownerEmail")
      .then((lake) => res.status(200).json(lake))
      .catch((err) => res.json(err));
  });


  //PUT /api/lake/:lakeId updates specific lake based on id.

router.put("/lake/:lakeId", isAuthenticated, (req, res, next) => {
    const { lakeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(lakeId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    Lake.findByIdAndUpdate(lakeId, req.body, { new: true })
      .then((lake) => res.status(200).json(lake))
      .catch((err) => res.json(err));
  });

  //DETE /api/lake/:lakeId deletes a specific lake based on id.

  router.delete("/lake/:lakeId", isAuthenticated, (req, res, next) => {
    const { lakeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(lakeId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    Lake.findByIdAndRemove(lakeId)
    .then(() =>
    res.json({
      message: `Lake with ${projectId} was removed successfully.`,
    })
  )   
      .catch((err) => res.json(err));
  });




module.exports = router;