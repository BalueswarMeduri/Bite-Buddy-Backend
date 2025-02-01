const vendorcontroller = require('../controllers/vendercontroller')
const express = require('express')

const router = express.Router();

router.post('/register',vendorcontroller.venderRegister)
router.post('/login',vendorcontroller.venderLogin)

router.get('/all-vendor',vendorcontroller.getallvendor)
router.get('/single-vendor/:chandu',vendorcontroller.getvendorbyid)

module.exports = router;