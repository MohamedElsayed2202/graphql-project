import { createHandler } from "graphql-http/lib/use/express";
import dbConnection from "./db-connection";
import schema from "../graphql/schema";
import expressPlayground from "graphql-playground-middleware-express";
import { formatError } from "./helpers";
import { isAuth } from "../middlewares/is-auth";

const bootstrap = (app: any) => {
  dbConnection();
  app.use(isAuth);
  app.all(
    "/graphql",
    createHandler({
      schema: schema,
      context: ({raw, context}) => {
        console.log(raw.auth, raw.user, raw.tokenIsExpired);
        return { req: raw, res: context.res };
      },
      formatError: formatError
    })
  );
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
};
export default bootstrap;
