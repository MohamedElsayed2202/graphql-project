import mongoose, { Schema, Model } from "mongoose";
import { IProfile } from "../interfaces/interfaces";

const schema = new Schema<IProfile, Model<IProfile>>({
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
})

const Profile = mongoose.model('Profile', schema);

export default Profile;