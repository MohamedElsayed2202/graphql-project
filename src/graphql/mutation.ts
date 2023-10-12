import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { TAccountInput } from "../types/custome-types";
import { IAccount } from "../interfaces/interfaces";
import { Request, Response } from "express";
import { accountSchema, validateSchema } from "../utils/validations";

const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register:{
            type: GraphQLString,
            args: {data: {type: TAccountInput}},
            resolve: async (_,{data}:{data: IAccount}, {req, res}:{req: Request, res: Response}) =>{
                await validateSchema(accountSchema, data);
                
                
                // const data = args.data as IAccount
                console.log(data.email);
                console.log(req.auth);
                
                res.cookie('refreshToken', 'refreshToken11111111111111', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });
                return 'sssssssssss'
            } 
        }
    }
});

export default rootMutation