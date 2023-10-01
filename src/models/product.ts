import mongoose, { Schema, Model } from "mongoose";
import { IProduct, IRate } from "../interfaces/interfaces";

const rateSchema = new Schema<IRate, Model<IRate>>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    rate: { type: Number, required: true },
    comment: { type: String, required: true }
})

const schema = new Schema<IProduct, Model<IProduct>>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, required: true },
    images: { type: [String], required: true },
    variations: [{
        color: { type: String, required: true },
        sizes: [{
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
        }],
        _id: false
    }],
    target: { type: String, required: true, enum: ['men', 'women', 'kids'] },
    soldItems: { type: Number, required: true, default: 0 },
    reating: { type: Number, required: true, default: 0 },
    rates: { type: [rateSchema], required: true, default: [] },
    brandId: { type: Schema.Types.ObjectId, required: true, ref: 'Brand', unique: true },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category', unique: true}
})
schema.index({name: 'text'});


const Product = mongoose.model('Product', schema);

export default Product;