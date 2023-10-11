import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { TAccountInput } from "../types/custome-types";
import { IAccount } from "../interfaces/interfaces";
import { Request, Response } from "express";

const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register:{
            type: GraphQLString,
            args: {data: {type: TAccountInput}},
            resolve: (_,{data}:{data: IAccount}, {req, res}:{req: Request, res: Response}) =>{
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