import * as yup from "yup";
import CustomeError from "../interfaces/custome-error";
import { IAccount, ICreateAccount, IUser } from "../interfaces/interfaces";
import { Types } from "mongoose";
import Account from "../models/account";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { Tokens } from "../types/custome-types";
import { sign } from "jsonwebtoken";
import Token from "../models/token";

export const formatError = (error: any) => {
  const originalError = error.originalError;
  if (originalError instanceof yup.ValidationError) {
    const message = "validation error occurred";
    const data: any[] = [];
    const code = 403;
    for (const err of originalError.inner) {
      const path = err.path;
      const errors = err.errors;
      data.push({
        path,
        errors,
      });
    }
    return { message, code, errors: data };
  }
  if (originalError instanceof CustomeError) {
    return {
      message: originalError.message,
      code: originalError.code,
      errors: originalError.errors,
    };
  }
  return error;
};

export async function registerUser(
  data: ICreateAccount
): Promise<Omit<IAccount, "password"> & { _id: Types.ObjectId }> {
  let { name, email, password, role, phone, address } = data;
  const user = await User.create({ name, phone, address });
  password = await bcrypt.hash(password, 12);
  const acc = await Account.create({ email, role, password, user: user._id });
  await acc.populate<{ user: IUser }>("user", "-__v -_id");
  return { _id: acc._id, email: acc.email, role: acc.role, user: acc.user };
}

export async function getTokenAndRefreshToken(
  id: string,
  role: string
): Promise<Tokens> {
  const token = sign(
    {
      id: id,
      role: role,
    },
    process.env.token_secret!,
    { expiresIn: "2h" }
  );

  const refreshToken = sign(
    {
      id: id,
      role: role,
    },
    process.env.refresh_secret!
  );

  const expiredAt = new Date();
  // expiredAt.setDate(expiredAt.getDate() + 7); the correct one
  expiredAt.setHours(expiredAt.getHours() + 0.5); // for testing

  const toke = await Token.create({
    token: refreshToken,
    userId: id,
    expiredAt: expiredAt,
  });

  return { token, refreshToken };
}

export async function getToken(id: string,
  role: string): Promise<Omit<Tokens, "refreshToken">> {
    const token = sign(
      {
        id: id,
        role: role,
      },
      process.env.token_secret!,
      { expiresIn: "2h" }
    );
    return {token}
  }
