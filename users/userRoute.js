const express=require('express')
const router=express.Router()
const User=require('./userSchema')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


router.get('/',async(req,res)=>{
    const user=await User.find().select('-password').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

router.post('/new',async (req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password),
        address:req.body.address
    })
    await newUser.save().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
       res.json({message:'The user is not found'})
    }
    if(user && bcrypt.compareSync(req.body.password,user.password)){
        const token=jwt.sign({userId:user._id},'secret')
        res.json({token:token})
    }
    else{
        res.json({message:'password do not match'})
    }
})


router.delete('/:id', async(req,res)=>{
    const user=await User.findByIdAndRemove(req.params.id).catch((err)=>{
        res.send(err)
    })
    if(user){
        res.json({
            message:"Delete Success"
        })
    }
    else{
        res.json({
            message:"Delete not Success"
        })
    }
})

module.exports=router