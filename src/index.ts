import "dotenv/config"
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import bootstrap from "./utils/bootstrap";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

bootstrap(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
})
