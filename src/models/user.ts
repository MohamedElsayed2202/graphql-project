import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../interfaces/interfaces";
import { checkSchema } from "express-validator";



const schema = new Schema<IUser, Model<IUser>>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:['admin','user','owner'], default:'user'},
    verified: Boolean,
    profile: {type: Schema.Types.ObjectId, required: true, ref: 'Profile'}
})

 const User = mongoose.model('User', schema);
 export default User