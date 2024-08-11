import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});
console.log(process.env.MONGODB_URI)

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database is connected");
    } catch (error) {
        console.log("database connection failed", error)
    }
}

export default connectDB;