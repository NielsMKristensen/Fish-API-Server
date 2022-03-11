# Fish-API-Server
## Put & Take Heaven, project #3 Full-stack Web Application. 

The 3rd and the final project is a single-page Web application using the MERN stack (MongoDB, Express, React & Node.js).

Put & Take Heaven is a single- page Web application build to help Put & Take lake owners to promote their lakes and giving the Angler an detailed overview of available lakes and the possibility to purchase fishing permit.



## User tory

As an Angler
i want to easily find a fishing lake for my next fishing trip.
so that i don't have to drive around and look for a place to fish.

As a Owner of a fishing lake
i would like a place to promote and share my fishing lake
so that i can get customers to my lake.

## Wire frames
check the wireframes.drawip in the repository.


## Technologies
-	Node.js
-	Express.js
-	MongoDB
-	Mongoose
-	ES6
-	Heroku
-	Axios
-	ironLauncher
-   cloudinary
-   bcryptjs


## Models
### Lakes Model:
const { Schema, model } = require("mongoose");

const lakeSchema = new Schema(
    {
      lakeName: {type: String, unique: true, required: true},
      street: String,
      city: String,
      lakePhoneNumber: Number,
      lakeEmail: String,
      description: String,
      openingHours: String,
      prices: String,
      CVRnumber: Number,
      pictureLinks: String, 
      ownerEmail: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: {}
    },
    },
  {  
    timestamps: true,
  }
);
const Lake = model("Lake", lakeSchema);
module.exports = Lake;


### Fishing Permit Model:
const { Schema, model } = require("mongoose");

const permitSchema = new Schema(
  {
    date: String,
    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lake: {
        type: Schema.Types.ObjectId,
        ref: 'Lake'
    }
  },
  {
    timestamps: true,
  }
);
const Permit = model("Permit", permitSchema);
module.exports = Permit;

### User Model :
const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: String,
    street: String,
    city: String,
    phoneNumber: Number,
    ownerOfLake: Boolean,
    lakesOwned: {
      type: Schema.Types.ObjectId,
      ref: 'Lake'
  },
  },
  {  
    timestamps: true,
  }
);
const User = model("User", userSchema);
module.exports = User;
## Server routes

| Method | Route | Description |
|:-------------:|:---------------:|:-----------:|
| /auth/signup | POST | Creates a new user in the database  |
| /auth/login | POST | logs the user in.Verifies email and password and returns a JWT |
| /auth/verify | POST | Used to verify JWT stored on the client |
| /api/lake | POST | creates a new Lake. |
| /api/uploadpicture | POST | picture upload to cloudinary, and register url in lake db |
| /api/lake | GET | get all the lakes. |
| /api/lake/:lakeId | GET | get specific lake based on id. |
| /api/lake/:lakeId | PUT | updates specific lake based on id. |
| /api/lake/:lakeId | DELETE | deletes a specific lake based on id. |
| / | GET | renders the homepage. |
| /api/permit | POST | Creates a new fishing permit |
| /api/user/:userId | GET | get specific lake based on id. this is for future setup |

## Project Link
dont let the name fool you, it was a mistake and i just found out when writing this. it is supposed to be fish API client. but hey stuff happens when you are busy. will be changed some time in the future.

https://fish-react-client.herokuapp.com/api

## Future Work
-  Change the URL name of the server.
-  User routes for user administration
-  Permit routes for permit administration
-  Google maps integration
-  Picture library integration
-  Payment via credit card integration

## Resources
- ironhack portal and previous labs.
- THE internet

## Team Put & Take Heaven
 - Niels M. Kristensen