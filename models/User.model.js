const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
