import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../interfaces/interfaces";



const schema = new Schema<IUser, Model<IUser>>({
    name: {type: String, required: true},
    phone: String,
    image: {
        type: {
            url: String,
            id: String,
        },
        required: false,
        _id: false,
    },
    address: String,
    // account: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
})

 const User = mongoose.model('User', schema);
 export default User