import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { authMutation } from "./auth/mutation";
import { authQuery } from "./auth/query";

const authMutationConfig = authMutation.toConfig();
const authQueryConfig = authQuery.toConfig();

export const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authMutationConfig.fields,
  },
});

export const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...authQueryConfig.fields
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;