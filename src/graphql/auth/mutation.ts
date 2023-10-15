import { GraphQLObjectType } from "graphql";
import bcrypt from "bcryptjs";
import CustomeError from "../../interfaces/custome-error";
import {
  ICreateAccount,
  IContext,
  ILoginRequest,
  IUser,
} from "../../interfaces/interfaces";
import { checkRole } from "../../middlewares/roles";
import {
  TCreateAccountSysUser,
  TAccountInput,
  TMessageToken,
  Tokens,
  TLoginInput,
  TAccount,
  TUser,
  TUserInput,
  TAccountResponse,
  TUserResponse,
} from "../../types/custome-types";
import {
  registerUser,
  getTokenAndRefreshToken,
  getToken,
} from "../../utils/helpers";
import { accountSchema, profileSchema } from "./auth.validations";
import Account from "../../models/account";
import Token from "../../models/token";
import { verify } from "jsonwebtoken";
import { validateSchema } from "../../utils/validations";
import User from "../../models/user";

export const authMutation = new GraphQLObjectType({
  name: "AuthMutation",
  fields: {
    registerSystemUser: {
      type: TCreateAccountSysUser,
      args: { body: { type: TAccountInput } },
      resolve: async (
        _,
        { body }: { body: ICreateAccount },
        { req, res }: IContext
      ) => {
        await validateSchema(accountSchema, body);
        const isOwner = checkRole("owner", req.user?.role || "");
        if (body.role && (body.role === "admin" || body.role === "owner")) {
          if (!isOwner) {
            throw new CustomeError(
              402,
              "unauthorised operation, only owner can add admin or owner user"
            );
          }
          const user = await registerUser(body);
          return { message: `${user.role} user created successfully`, user };
        }
        throw new CustomeError(
          403,
          "only system users can register with this request"
        );
      },
    },
    registerNormalUser: {
      type: TMessageToken,
      args: { body: { type: TAccountInput } },
      resolve: async (
        _,
        { body }: { body: ICreateAccount },
        { req, res }: IContext
      ) => {
        await validateSchema(accountSchema, body);
        if (body.role && body.role !== "user") {
          throw new CustomeError(
            403,
            "only normal users can register with this request"
          );
        }
        const user = await registerUser(body);
        const { token, refreshToken }: Tokens = await getTokenAndRefreshToken(
          user._id.toString(),
          user.role!
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        return { message: "created successfully", token };
      },
    },
    login: {
      type: TMessageToken,
      args: {
        body: {
          type: TLoginInput,
        },
      },
      resolve: async (
        _,
        { body }: { body: ILoginRequest },
        { req, res }: IContext
      ) => {
        const { email, password } = body;
        const user = await Account.findOne({ email: email });
        if (!user) {
          const error = { email: "This email does not exist." };
          throw new CustomeError(401, "invalid credentials", error);
        }
        if (!(await bcrypt.compare(password, user!.password))) {
          const error = { password: "Wrong password" };
          throw new CustomeError(401, "invalid credentials", error);
        }
        const { token, refreshToken }: Tokens = await getTokenAndRefreshToken(
          user!._id.toString(),
          user.role!
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        return { message: "logged in successfully", token };
      },
    },
    refresh: {
      type: TMessageToken,
      resolve: async (_, __, { req, res }: IContext) => {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
          throw new CustomeError(401, "refresh token is required");
        }
        const data: any = verify(refreshToken, process.env.refresh_secret!);
        if (!data) {
          throw new CustomeError(401, "unauthenticated");
        }
        const dbToken = await Token.findOne({
          userId: data.id,
          token: refreshToken,
        });
        if (!(dbToken!.expiredAt >= new Date())) {
          await dbToken?.deleteOne();
          throw new CustomeError(440, "login time-out");
        }
        const { token } = await getToken(data.id, data.role);
        return { message: "success", token };
      },
    },
    logout: {
      type: TMessageToken,
      resolve: async (_, __, { req, res }: IContext) => {
        const { refreshToken } = req.cookies;
        await Token.findOneAndRemove({ token: refreshToken });
        res.cookie("refreshToken", "", { maxAge: 0 });
        return { message: "Logged out" };
      },
    },
    editProfile: {
      type: TUserResponse,
      args: { body: { type: TUserInput } },
      resolve: async (_, { body }: { body: IUser }, { req, res }: IContext) => {
        const { user, auth } = req;
        if (!auth) {
          throw new CustomeError(401, "unauthorized");
        }
        await validateSchema(profileSchema, body);
        const { name, phone, address, image } = body;
        const userProfile = await User.findById(user?.user, '-__v');
        userProfile!.name = name || userProfile?.name;
        userProfile!.address = address || userProfile?.address;
        userProfile!.phone = phone || userProfile?.phone;
        userProfile!.image = image || userProfile?.image;
        await userProfile?.save();
        // await user?.populate<{user: IUser}>('user','-_id -__v');
        return {message: 'updated successfully', user: userProfile};
      },
    },
    getProfile: {
        type: TAccountResponse,
        resolve: async (_, __, { req, res }: IContext) => {
            const {user, auth} = req;
            if(!auth){
                throw new CustomeError(401, 'unauthorized');
            }
            await user?.populate<{user: IUser}>('user', '-_id');
            return {account: {user: user?.user, role: user?.role, _id: user?._id, email: user?.email}}
        }
    }
  },
});
