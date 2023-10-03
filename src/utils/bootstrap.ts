import { createHandler } from "graphql-http/lib/use/express";
import dbConnection from "./db-connection";
import schema from "../graphql/schema";
import expressPlayground from "graphql-playground-middleware-express"

const bootstrap = (app: any) => {
    dbConnection();
    app.all('/graphql', createHandler({
        schema: schema,
        context: ( req ) => ({req: req.raw, res: req.context.res})
    }))
    app.get('/playground', expressPlayground({endpoint: '/graphql'}))
}
export default bootstrap;