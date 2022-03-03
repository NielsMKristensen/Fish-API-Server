const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Permit = model("Permit", permitSchema);

module.exports = Permit;
