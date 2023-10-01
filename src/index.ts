import "dotenv/config"
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express"
import schema from "../graphql/schema";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.all('/graphql', createHandler({
    schema: schema,
}))
app.get('/playground', expressPlayground({endpoint: '/graphql'}))
app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
})
