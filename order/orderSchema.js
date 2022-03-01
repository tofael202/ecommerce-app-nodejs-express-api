const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem'
    }],
    shipingAdress:{
        type:String,
        default:""
    },
    totalPrice:{
        type:Number
    },
    orderStatus:{
     type:String,
     required:true,
     default:'pending'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const orderModel= mongoose.model('Order',orderSchema)
module.exports=orderModel;