const Firm = require("../models/Firm");
const Vendor = require("../models/Vender");
const multer = require('multer');
const path = require('path'); // Ensure path module is imported

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Ensure './uploads' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append correct file extension
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const img = req.file ? req.file.filename : undefined;

        // Ensure vendor ID is correctly assigned from the middleware
        if (!req.vendorid) {
            return res.status(403).json({ error: "Unauthorized: Vendor ID missing" });
        }

        const vendor = await Vendor.findById(req.vendorid);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            img,
            vendor: vendor._id
        });

        const savedfirm = await firm.save();
        vendor.firm.push(savedfirm)
        await vendor.save()

        return res.status(201).json({ message: 'Firm added successfully', firm });
    } catch (error) {
        console.error("Error in addFirm:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteFirmbyId = async(req, res)=>{
    try {
        const firmId = req.params.firmId;
        const deletProduct = await Product.findByIdAndDelete(firmId);
        if(!deletProduct){
            return res.status(404).json({error : "no product foudn"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({erro : "internal severs error"})
    }
}

module.exports = { addFirm : [upload.single('img'), addFirm],deleteFirmbyId };
