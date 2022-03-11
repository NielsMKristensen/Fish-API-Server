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
