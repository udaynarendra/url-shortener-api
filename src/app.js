import express from "express";
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js"
import urlRouter from "./routes/url.routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/auth',authRouter);
app.use('/api/v1',urlRouter);
app.use(errorHandler)
export default app;