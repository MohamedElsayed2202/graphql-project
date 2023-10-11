import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

export type Tokens = {
  token: string;
  refreshToken: string;
};

export const TAccountInput = new GraphQLInputObjectType({
  name: "AccountInput",
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: GraphQLString,
    },
    verified: {
      type: GraphQLBoolean,
    },
    user: {
      type: GraphQLID,
    },
  },
});
