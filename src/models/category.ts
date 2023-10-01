import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../interfaces/interfaces";


const schema = new Schema<ICategory, Model<ICategory>>({
    name: {type: String, required: true},
    products : {type: [Schema.Types.ObjectId], ref: 'Product', required: true, default: []}
});

const Category = mongoose.model('Category', schema);

export default Category;