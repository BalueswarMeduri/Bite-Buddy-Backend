const vendor = require('../models/Vender');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
const secky = process.env.whatIsYourName;

const verifytoken = async (req, res, next) => {
    const token = req.headers.token; // Corrected req.header.token to req.headers.token
    if (!token) {
        return res.status(401).json({ error: "token is required" }); // Fixed "erro" to "error"
    }
    try {
        const decoded = jwt.verify(token, secky);
        console.log("Decoded Token:", decoded);
        const vender = await vendor.findById(decoded.vendorID);
        console.log("Vendor from DB:", vender); 
        console.log(vendor)
        if (!vender) { // Fixed incorrect vendor check (should be vender, matching variable)
            return res.status(404).json({ error: "vendor required" });
        }
        req.vendorid = vender._id; // Changed res.vendorid to req.vendorid to store in request
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports = verifytoken;
