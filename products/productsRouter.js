const express=require('express')
const router=express.Router()
const Product=require('./productSchema')
//const Category=require('../categories/categorySchema')


//router
router.get('/' ,async (req,res)=>{
    const product= await Product.find()
    if(!product){
        res.json({message:"No Product Found"})
    }
    else{
        res.send(product)
    }
})

router.get('/:id' ,async (req,res)=>{
    const product= await Product.findById(req.params.id).populate('category')
    if(!product){
        res.json({message:"No Product Found"})
    }
    else{
        res.send(product)
    }
})

router.post('/new', async (req,res)=>{
    const newProduct= new Product(req.body)
    await newProduct.save().then((data)=>{
        res.json({message:'Product creation Success'})
    }).catch((err)=>{
        if(err)
            throw err;
    })
})
router.put('/:id' ,async (req,res)=>{
    const product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((data)=>{
        res.json({message:"Update Success"})
        res.send(data)
    }).catch((err)=>{
        if(err)
            res.send(err)
    })
})




router.delete('/:id' ,async (req,res)=>{
    const product= await Product.findByIdAndRemove(req.params.id)
    if(!product){
        res.json({message:"No Delete"})
    }
    else{
        res.json({message:"Delete Success"})
    }
})
module.exports=router