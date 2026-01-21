import mongoose, { Schema } from "mongoose";

const OrganisationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  organisationType: {
    type: String,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  establishedOn: {
    type: Date,
  },
  website: {
    type: String,
  },
});

const Organisation =
  mongoose.models.Organisation ||
  mongoose.model("Organisation", OrganisationSchema);
export default Organisation;
