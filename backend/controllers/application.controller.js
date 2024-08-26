import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js ";

export const applyJob = async(req, res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false,
            });
        };
        // check if user already apply for this jobs
        const existingApplication = await Application.findOne({job: jobId , applicants:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"you have already applied for this job",
                success:false
            });
        }
        // check if job is exist
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicants:userId
        });
        Job.application.push(newApplication._id);
        await Job.save();
        return res.status(201).json({
            message:"apply the job successfully",
            success:true,
        })

    } catch (error) {
       console.log(error) 
    }
}

// get all applied jobs
export const getAppliedJob = async(req,res)=>{
    try {
        const userId = req.id;
        const applications = await Application.find({applicants:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        });
        if(!applications){
            return res.status(404).json({
                message:"Applications not found",
                success:false,
            })
        };
        return res.status(200).json({
            applications,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

// admin dekhega ki kitne user ne apply kiya hai is job ke liye

export const getApplicants = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"application",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicants'
            }
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

// update status
export const updateStatus = async(req, res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status is required",
                success:true
            });
        };
        // find application
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"application in not found",
                success:false,
            });
        };
        // update the status
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"application updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}