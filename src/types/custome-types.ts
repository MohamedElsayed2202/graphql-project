import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export type Tokens = {
  token: string;
  refreshToken: string;
};

export const TAccountInput = new GraphQLInputObjectType({
  name: "AccountInput",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
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

export const TLoginInput = new GraphQLInputObjectType({
  name: "LoginInput",
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
})

export const TImage = new GraphQLObjectType({
  name: "Image",
  fields: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

export const TImageInput = new GraphQLInputObjectType({
  name: "ImageInput",
  fields: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

export const TUser = new GraphQLObjectType({
  name: "User",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
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
  },
});

export const TUserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      type: GraphQLString,
    },
    image: {
      type: TImageInput,
    },
    address: {
      type: GraphQLString,
    },
  },
});

export const TUserResponse = new GraphQLObjectType({
  name: "UserResponse",
  fields: {
    message: {
      type: GraphQLString,
    },
    user: {
      type: TUser,
    },
  }
})

export const TAccount = new GraphQLObjectType({
  name: "Account",
  fields: {
    user: {
      type: new GraphQLNonNull(TUser),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
    },
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

export const TAccountResponse = new GraphQLObjectType({
  name: "AccountResponse",
  fields: {
    message: {
      type: GraphQLString,
    },
    account: {
      type: TAccount,
    },
  }
})

export const TCreateAccountSysUser = new GraphQLObjectType({
  name: "CreateAccountForSystemUser",
  fields: {
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: TAccount,
    },
  },
});

export const TMessageToken = new GraphQLObjectType({
  name: "CreateAccountForNormalUser",
  fields: {
    message: {
      type: GraphQLString,
    },
    token: {
      type: GraphQLString,
    },
  },
});
