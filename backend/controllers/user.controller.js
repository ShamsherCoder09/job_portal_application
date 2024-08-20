import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req, res)=>{
    try {
        const{fullName, email, password , role, phoneNumber} = req.body;
        if(!fullName || !email || !password || !role || !phoneNumber) {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"user already exist with this email",
                success:false,
            })
        }
        const hashPassword = await bcrypt.hash(password , 10);
        
        await User.create({
            fullName,
            email,
            password:hashPassword,
            phoneNumber,
            role
        });
        return res.status(200).json({
            message:"User successfully registered",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}

export const login  = async(req, res)=>{
    try {
        const { email, password,role} = req.body;
        // console.log(email, password, role);
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"email and password is incorrect",
                success:false
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                message:"email and password is incorrect",
                success:false
            });
        }
        // check role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message:"user does not exist with this role",
                success:false
            });
        }

        const tokendata = {
            userId : user._id
        }
        const token = await jwt.sign(tokendata, process.env.SECRET_KEY,  { expiresIn: '1d' });

        user={
            id: user._id,
            fullName:user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict'}).json({
            message:`Welcome back ${user.fullName}`,
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
};

// logout 
export const logout = async (req, res)=>{
    try {
        return res.status(200).cookie("token", "",{maxAge:0}).json({
            message:"logged out successfully",
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
};

// update user 
export const updateUser = async (req, res)=>{
    try {
        const{fullName, email, phoneNumber, bio , skills} = req.body;
        const file = req.file;
        // cloudinary se aayega 

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            });
        }

        // updating data
        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber= phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skills;

        // resume comes later

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber :user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"profile upadted successfully",
            user,
            success: true
        });

        
    } catch (error) {
        console.log(error);
    }
}