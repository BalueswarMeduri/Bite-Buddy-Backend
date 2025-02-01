const express = require('express')
const dotEnv = require('dotenv')
const mongooes = require('mongoose')
const vendorRoute = require('./routers/vendorRoute')
const bodyparser = require('body-parser');
const firmrouter = require('./routers/firmRoute')
const productrouter = require('./routers/productRoute')
const path = require('path')
dotEnv.config();

const app = express();

const PORT = process.env.PORT || 4001;

mongooes.connect(process.env.MONOG_URI)
.then(()=>{
    console.log("Mongodb is connect !!!")
})
.catch((err)=>{
    console.log(err)
})
app.use(bodyparser.json())
app.use('/vendor',vendorRoute)
app.use('/firm',firmrouter)
app.use('/product',productrouter)
app.use('/uploads',express.static('uploads'))


 // Change to 4001 or any other available port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use('/home',(req,res)=>{
    res.send('Welcome to Home Page')
})