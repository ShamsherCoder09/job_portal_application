import { Company } from "../models/company.model.js";

export const registerCompany = async(req, res)=>{
    try {
        const{name} = req.body;
        if(!name){
            res.status(400).json({
                message:"Company is required",
                success:false
            })
        }
        let company = await Company.findOne({name});
        if(company){
            res.status(400).json({
                message:"You can't register same company",
                success:false
            })
        };
        // create company in a database
        company = await Company.create({
            name,
            userId:req.id
        });
        return res.status(200).json({
            message:"Company Registered Successfully",
            company,
            success:true
        });

    } catch (error) {
        console.log(error);
    }

};

// getCompany basis on id , how many company created by the one user 
export const getCompany = async(req,res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Company Not Found",
                success:false,
            });
        }
        return res.status(200).json({
            companies,
            success:true,
        });
    } catch (error) {
        console.log(error)
    }
};


// get the company by id's
export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!companyId){
            return res.status(404).json({
                message:"Company Not Found",
                success:false,
            });
        };
        return res.status(200).json({
            company,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};

// update the company details
export const updateCompany = async(req,res)=>{
    try {
        const {name,description,location,website} = req.body;
        const file = req.file
        // idhar cloudinary aayega
    
        const updateData = {name,description,location,website} ;
        const company = await Company.findByIdAndUpdate(req.params.id, updateData , {new:true});
    
        if(!company){
            return res.status(400).json({
                message:"Company Not Found",
                success:true
            })
        };
        return res.status(200).json({
            message:"Company Information Updated",
            success:true
        });
    
    } catch (error) {
        console.log(error);
    }
}
