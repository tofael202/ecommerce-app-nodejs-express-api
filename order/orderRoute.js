const express=require('express')
const router=express.Router()
const Order=require('./orderSchema')
const OrderItem=require('./orderItemSchema')

router.get('/', async (req,res)=>{
    const allOrder= await Order.find()
    if(!allOrder){
        res.json({mess:'No order'})
    }
    else{
        res.json({orders:allOrder})
    }
})
router.get('/:id', async (req,res)=>{
    const allOrder= await Order.findById(req.params.id).populate('user').populate({path:'orderItems', populate:'products'})
    if(!allOrder){
        res.json({mess:'No order'})
    }
    else{
        res.json({orders:allOrder})
    }
})

router.post('/new',async (req,res)=>{
    const orderItemIds=Promise.all(req.body.orderItems.map(async orderitem=>{
        var newOrderItem= new OrderItem({
            products:orderitem.products,
            quantity:orderitem.quantity
        })
        newOrderItem=  await newOrderItem.save()
        return newOrderItem._id
    }))
    const orderItemIdsres=await orderItemIds
    console.log(orderItemIds)
    
    const newOrder=new Order({
        orderItems:orderItemIdsres,
        shipingAdress:req.body.shipingAdress,
        totalPrice:req.body.totalPrice,
        orderStatus:req.body.orderStatus,
        user:req.body.user
    })
    await newOrder.save().then(()=>{
        res.json({mess:'Ordeer placed Successfull'})
    }).catch((err)=>{
        res.json({mess:err})
    })
})


router.delete('/:id' ,async (req,res)=>{
    const order= await Order.findByIdAndRemove(req.params.id)
    if(order){
         order.orderItems.map( async itemid=>{
             console.log(itemid)
            await OrderItem.findByIdAndRemove(itemid)
        })
        res.json({message:"Delete Success"})
    }
    else{
        
        res.json({message:"No Delete"})
    }
})

router.delete('/item/:id' ,async (req,res)=>{
    const order= await Order.findByIdAndRemove(req.params.id)
    if(!order){
        res.json({message:"No Delete"})
    }
    else{
        res.json({message:"Delete Success"})
    }
})

module.exports=router