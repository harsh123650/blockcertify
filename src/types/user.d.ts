import mongoose from "mongoose";
import { Address } from "./Address";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  profileImage: string;
  phone: string;
  password: string;
}
