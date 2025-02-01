const mongoose = require("mongoose")

const productschema = new mongoose.Schema({
    productname:{
        type : String,
        required : true,
    },
    price:{
        type :String,
        required : true,
    },  
    category:{
        type : [
            {
                type : String,
                enum : ["Veg", "Non-Veg"],
            }
        ]
    },
    img:{
        type : String,
    },
    bestSeller:{
        type : String,
    },
    descri:{
        type : String,
    },
    firm:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Firm'
        }
    ]

})

const Product = mongoose.model("product",productschema);
module.exports = Product