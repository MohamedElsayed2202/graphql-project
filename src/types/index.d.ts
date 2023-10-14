import { Document, Types } from "mongoose";
import { IAccount, IUser } from "../interfaces/interfaces";

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: Document<unknown, {}, IAccount> & IAccount & { _id: Types.ObjectId; },
            auth?: boolean,
            tokenIsExpired?: boolean
        }
    }
}