import mongoose, { Schema } from "mongoose";

const CertificateSchema = new Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  issuer: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  issuingOrganisation: {
    type: Schema.ObjectId,
    ref: "Organisation",
    required: true,
  },
  issuedTo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  certificateDetails: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // Additional details like reason for issuance
    },
    category: {
      type: String,
      enum: ["Academic", "Employment", "Legal", "Other"],
      required: true,
    },
  },
  issuedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);
export default Certificate;
