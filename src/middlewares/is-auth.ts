import asyncHandler from "express-async-handler";
import { verify } from "jsonwebtoken";
import Account from "../models/account";

export const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1] || "";
  if (!token) {
    req.auth = false;
    return next();
  }
  const decodedToken: any = verify(
    token,
    process.env.token_secret!,
    (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        req.tokenIsExpired = true;
      }
      if (decoded) {
        const { id, role } = <any>decoded;
        return { id, role };
      }
    }
  );

  if (!decodedToken) {
    req.auth = false;
    return next();
  }

  const user = await Account.findById(decodedToken.id);
  if (!user) {
    req.auth = false;
    return next();
  }
  req.user = user!;
  req.auth = true;
  next();
});
