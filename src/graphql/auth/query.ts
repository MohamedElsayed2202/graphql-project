import { GraphQLObjectType, GraphQLString } from "graphql";
import { rootQuery } from "../schema";

export const authQuery = new GraphQLObjectType({
  name: "AuthQuery",
  fields: {
    users: {
      type: GraphQLString,
      resolve: (_, context) => {
        console.log(context);

        return "hellow world";
      },
    },
  },
});
