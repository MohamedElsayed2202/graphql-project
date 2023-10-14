import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { IUser } from "../interfaces/interfaces";

export type Tokens = {
  token: string;
  refreshToken: string;
};

export const TAccountInput = new GraphQLInputObjectType({
  name: "AccountInput",
  fields: {
    name:{
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
  },
});

export const TImage = new GraphQLObjectType({
  name: "Image",
  fields: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
    }
  }
})
export const TUser = new GraphQLObjectType({
  name: "User",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    phone: {
      type: GraphQLString,
    },
    image: {
      type: TImage,
    },
    address: {
      type: GraphQLString,
    },
  }
})

export const TAccount = new GraphQLObjectType({
  name: "Account",
  fields: {
    user: {
      type: new GraphQLNonNull(TUser),
    },
    role:{
      type: new GraphQLNonNull(GraphQLString)
    },
    _id:{
      type: new GraphQLNonNull(GraphQLID)
    },
    email:{
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})

export const TCreateAccount = new GraphQLObjectType({
  name: "CreateAccount",
  fields: {
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    data:{
      type: TAccount
    },
    token:{
      type: GraphQLString,
    }
  }
})

export const TCreateAccountUser = new GraphQLObjectType({
  name: "CreateAccountUser",
  fields: {
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    token:{
      type: new GraphQLNonNull(GraphQLString),
    }
  }
})