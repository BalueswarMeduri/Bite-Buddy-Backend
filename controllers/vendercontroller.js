const Vendor = require('..//models/Vender')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')

dotenv.config();
const key = process.env.whatIsYourName

const venderRegister = async (req, res)=>{
    const {username, email, password} = req.body
    try{
        const venderemail = await Vendor.findOne({email});
        if(venderemail){
            return res.status(400).json("Email is already taken")
        }
        const hashpassword = await bcrypt.hash(password,10)

        const newvendor = new Vendor({
            username,
            email,
            password:  hashpassword
        });
        await newvendor.save();
        res.status(216).json({message : "vendor successfully registered"})
        console.log("vendor registered successfully");
        
    }catch(error){
        console.log(error)
        res.status(500).json({error : "internal server error"})
    }
}

const venderLogin = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const vendor = await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error: "Invalid email or passworld"})
        }
        const token = jwt.sign({vendorID: vendor._id},key, {expiresIn:"1h"})
        res.status(200).json({success : "user found and Login successfull", token})
        console.log(email, "this is your token : " , token)
    }catch(error){
        res.status(401).json({error : "Internal sever error"})
        console.log(error)
    }
}

const getallvendor = async(req, res)=>{
    try {
        const vendors = await Vendor.find().populate('firm')  
        res.json({vendors})
    } catch (error) {
        console.log(error)
        res.status(401).json({error : "Internal sever error"})
    }
}
const getvendorbyid = async (req, res) => {
    const vendorId = req.params.chandu; // Ensure this matches your route parameter
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm'); // Use findById instead of find
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        res.status(200).json({ vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Use 500 instead of 401
    }
};


module.exports = {venderRegister,venderLogin,getallvendor,getvendorbyid};