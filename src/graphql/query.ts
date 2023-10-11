import { GraphQLObjectType, GraphQLString } from "graphql";

const rootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        users: {
            type: GraphQLString,
            resolve: (_,context) => {
                console.log(context);
                
                return "hellow world"
            }
        }
    }
});

export default rootQuery