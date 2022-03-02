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
      email: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Lake = model("Lake", lakeSchema);

module.exports = Lake;
