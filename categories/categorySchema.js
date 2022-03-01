const { default: mongoose } = require("mongoose");

categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }

})

const categoryModel=new mongoose.model('Category',categorySchema);

module.exports=categoryModel