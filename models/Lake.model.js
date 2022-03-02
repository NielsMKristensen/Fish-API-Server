const { Schema, model } = require("mongoose");


const lakeSchema = new Schema(
  {
    name: String,
    street: String,
    city: String,
    password: String,
    phoneNumber: Number,
    email: {
      type: String,
      unique: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Lake = model("Lake", lakeSchema);

module.exports = Lake;
