const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();
var cors = require('cors')
const cloudinary = require('cloudinary').v2;

const Lake = require("../models/Lake.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require('../config/cloudinary.config');

//POST /api/lakes creates a new Lake

router.post("/lake", isAuthenticated, (req, res, next) =>{
    const {lakeName, street, city, lakePhoneNumber, lakeEmail, description, openingHours, prices, CVRnumber, pictureLinks, ownerEmail} = req.body;

    Lake.create ({lakeName, street, city, lakePhoneNumber, lakeEmail, description, openingHours, prices, CVRnumber, pictureLinks, ownerEmail})
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

//picture upload to cloudinary

router.post("/uploadpicture", isAuthenticated, async (req, res, next) =>{
    try {
        const file = req.body.data;
        const uploade = await cloudinary.uploader.upload(file)

        const lakeNameFromHeader = req.headers.lake
        const lakeUrl = uploade.url
        
        // a bit messy finding the id of the lake and updates the lake document with picrureLunks url to the cloudinary picture.
        Lake.find()
        .then(allLakes =>{
          const foundLake = allLakes.find( lakes => {
            if (lakes.lakeName === lakeNameFromHeader) {
              const lakeId = lakes._id
              return lakeId
            }
          });
           return foundLake
          })
          .then(newLake =>{
            return Lake.findByIdAndUpdate( newLake._id , { pictureLinks: lakeUrl });
          })
          .then(response => res.json(response))
          .catch(err => res.json(err));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Upload not DONE' });
    }
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

  //DELETE /api/lake/:lakeId deletes a specific lake based on id.

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