import express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.router.js";
import companyRoute from './routes/company.router.js';
import jobRouter from './routes/job.router.js'
import applicationRouter from './routes/application.router.js'

dotenv.config({});
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
    origin:"http//localhost:5173",
    credentials:true
}
app.use(cors(corsOption));


const PORT =process.env.PORT ;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRouter);
app.use('/api/v1/application',applicationRouter);

app.listen(PORT , ()=>{
    connectDB();
    console.log(`our server is running on ${PORT}`);
})