const mongoose=require('mongoose');
const Category=require('../categories/categorySchema')

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    details:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    imageGallery:[{
        type:String,
        default:''
    }],
    stock:{
        type:String,
        //required:true,
        min:0,
        max:200
    },
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Category,
        //required:true
    },
    featured:{
        type:Boolean,
        default:"false"
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const productModel=new mongoose.model('Product',productSchema)

module.exports=productModel