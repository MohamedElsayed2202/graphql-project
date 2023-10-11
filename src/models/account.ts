import mongoose, { Schema, Model } from "mongoose";
import { IAccount } from "../interfaces/interfaces";

const schema = new Schema<IAccount, Model<IAccount>>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ["admin", "user", "owner"], default: "user" },
  verified: {type: Boolean, default: false},
  // user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
});

const Account = mongoose.model("Account", schema);

export default Account;
