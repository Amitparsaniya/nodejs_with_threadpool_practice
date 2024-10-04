const mongoose =require("mongoose")

const productSchema = mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required :true
    },
    qty:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    }
,{
    timeStamps:true
}
)

const Product = mongoose.model("Product",productSchema)

module.exports=Product