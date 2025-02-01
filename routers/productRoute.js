const express = require("express");
const productcontroller = require('../controllers/productcontroller')

const router = express.Router();

router.post('/add-product/:firmid', productcontroller.addProduct);


router.get('/:firmid/products', productcontroller.getproductbyfirm);

router.get('/uploads/:imageName',(req, res)=>{
    const imageName  = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});
router.delete('/:productId',productcontroller.deleteProductbyId)


module.exports = router;