
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
    applicants:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:mongoose.Schema.Types.ObjectId,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },

},{timestamps:true});

export const Application = mongoose.Schema("Application",applicationSchema)