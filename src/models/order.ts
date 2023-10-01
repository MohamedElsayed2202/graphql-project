import mongoose, { Schema, Model } from "mongoose";
import { IOrder } from "../interfaces/interfaces";

const schema = new Schema<IOrder, Model<IOrder>>({
    userId: { type: Schema.Types.ObjectId , required: true, ref: "User" },
    cartId: { type: Schema.Types.ObjectId, required: true, ref: "Cart" },
    status: { type: String, required: true, default: "pending", enum: [ "pending", "confirmed", "delevering", "delevered"]}
})

const Order = mongoose.model("Order", schema);

export default Order;