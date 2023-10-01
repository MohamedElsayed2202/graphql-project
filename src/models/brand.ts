import mongoose, { Schema, Model } from "mongoose";
import { IBrand } from "../interfaces/interfaces";

const schema = new Schema<IBrand, Model<IBrand>>({
    name: {type: String, required: true, unique: true},
    logo: {type:{
        url: String,
        id: String
    }, _id: false},
    categories: {type: [Schema.Types.ObjectId], ref: 'Category', required: true, default: []}
})

const Brand = mongoose.model('Brand', schema);

export default Brand;