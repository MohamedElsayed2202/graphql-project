import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { TAccountInput, TCreateAccount, TCreateAccountUser, Tokens } from "../types/custome-types";
import { IAccount, IContext, ICreateAccount } from "../interfaces/interfaces";
import { accountSchema, validateSchema } from "../utils/validations";
import { getTokens, registerUser } from "../utils/helpers";
import CustomeError from "../interfaces/custome-error";
import { checkRole } from "../middlewares/roles";

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: TCreateAccount,
      args: { data: { type: TAccountInput } },
      resolve: async (
        _,
        { data }: { data: ICreateAccount },
        { req, res }: IContext
      ) => {
        await validateSchema(accountSchema, data);
        const isOwner = checkRole("owner", req.user?.role || "");
        if ((data.role && data.role === "admin") || data.role === "owner") {
          if (!isOwner) {
            throw new CustomeError(
              402,
              "unauthorised operation, only owner can add admin or owner user"
            );
          }
        }
        const user = await registerUser(data);
        console.log(user);

        if (user.role === 'admin' || user.role === 'owner') {
            return {message: `${user.role} user created successfully`, user}
        }

        const { token, refreshToken }: Tokens = await getTokens(user._id.toString(), user.role!);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        return {message: "created successfully", token};
      },
    },
  },
});

export default rootMutation;
