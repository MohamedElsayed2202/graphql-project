import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLNonNull} from "graphql"



const nameInputType = new GraphQLInputObjectType({
    name: 'NameInput',
    fields: {
        name:{ 
            type: new GraphQLNonNull(GraphQLString),
        }
    }
})



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
})

const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser:{
            type: GraphQLString,
            args:{
                name: {
                    type: nameInputType
                }
            },
            resolve: (_,args, context) =>{
                
            } 
        }
    }
})


const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

export default schema