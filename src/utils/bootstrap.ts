import errorMiddleware from "../middlewares/error";
import brandRouter from "../routes/brand";
import categoryRouter from "../routes/category";
import authRouter from "../routes/user";
import dbConnection from "./db-connection";

const bootstrap = (app: any) => {
    dbConnection();
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/brands', brandRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use(errorMiddleware)
}
export default bootstrap;