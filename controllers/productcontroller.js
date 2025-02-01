const Firm = require("../models/Firm");
const Product = require("../models/Product");
const multer = require("multer")
const path = require("path");

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



const addProduct = async (req, res) =>{
    try {
        const {productname,price,category,bestSeller,descri} = req.body
        const img = req.file ? req.file.filename : undefined;

        const firmid = req.params.firmid;
        const firm = await Firm.findById(firmid)
        if(!firm){
            return res.status(404).json({error : "firm not found"})
        }
        const product = new Product({
            productname,price,category,bestSeller,descri,img, firm : firm._id
        })
        const savedproudct = await product.save()

        firm.products.push(savedproudct)

        await firm.save()

        res.status(200).json(savedproudct)
    } catch (error) {
        console.error(error)
        res.status(404).json({error : "interval sever error"})
    }
}


const getproductbyfirm = async (req, res) => {
    try {
        const firmId = req.params.firmid; // ✅ Match route parameter name
        console.log("Firm ID received:", firmId); // ✅ Correct logging

        const firm = await Firm.findById(firmId); // ✅ Ensure `await` is used
        if (!firm) {
            return res.status(404).json({ error: "Firm not found" });
        }
        const restaurantName = firm.firmName
        const products = await Product.find({ firm: firmId });
        res.status(200).json(restaurantName ,products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // ✅ Fixed typo "interval" -> "internal"
    }
};

const deleteProductbyId = async(req, res)=>{
    try {
        const productId = req.params.productId;
        const deletProduct = await Product.findByIdAndDelete(productId);
        if(!deletProduct){
            return res.status(404).json({error : "no product foudn"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({erro : "internal severs error"})
    }
}


module.exports = { addProduct: [upload.single('img'), addProduct],getproductbyfirm ,deleteProductbyId};
