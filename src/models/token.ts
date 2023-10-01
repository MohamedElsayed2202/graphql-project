import mongoose, { Schema, Model } from "mongoose";
import { IToken } from "../interfaces/interfaces";



const schema = new Schema<IToken, Model<IToken>>({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    token: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: new Date()},
    expiredAt: {type: Date, required: true}
})

const Token = mongoose.model('Token',schema);

export default Token