import {GraphQLSchema, GraphQLObjectType, GraphQLString} from "graphql"


const rootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        users: {
            type: GraphQLString,
            resolve: () => "hellow world"
        }
    }
})

const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser:{
            type: GraphQLString,
            resolve: () => "hellow world" 
        }
    }
})


const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

export default schema