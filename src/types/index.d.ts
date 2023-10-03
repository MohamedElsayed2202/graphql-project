import { Document, Types } from "mongoose";
import { IUser } from "../interfaces/interfaces";

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId; };
        }
    }
}