const express=require('express');
const router=express.Router();
const Category=require('./categorySchema')


router.get('/' ,async (req,res)=>{
    const category= await Category.find()
    if(category){
        res.send(category)
        
    }
    else{
        res.json({message:"No Category Found"})
    }
})
router.get('/:id' ,async (req,res)=>{
    const category= await Category.findById(req.params.id)
    if(!category){
        res.json({message:"No Category Found"})
        
        
    }
    else{
        res.send(category)
    }
})
//create new category
router.post('/new', async (req,res)=>{
    const newCategory= new Category(req.body)
    await newCategory.save().then((data)=>{
        res.json({message:'category creation Success'})
    }).catch((err)=>{
        if(err)
            throw err;
    })
})
//category delete
router.delete('/:id', async (req,res)=>{
    await Category.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.json({err:err})

        }
        else{
            res.json({message:'Delete Success'})
        }
    }).clone()
})
//update category
router.put('/:id', async (req,res)=>{
    await Category.findByIdAndUpdate(req.params.id,req.body,(err)=>{
        if(err){
            res.json({err:err})

        }
        else{
            res.json({message:'Update Success'})
        }
    }).clone()
})

module.exports=router