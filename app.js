//loading modules
const express=require('express');
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const dotenv=require('dotenv')
const categoryRoute=require('./categories/categoryRoute')
const productRoute=require('./products/productsRouter')
const userRoute=require('./users/userRoute')
const authJwt=require('./helpers/auth')
const errorHandler=require('./helpers/errorHandlers')
const orderRoute=require('./order/orderRoute')

//midleware
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
//app.use(authJwt)
app.use(errorHandler)
//routing
app.use('/user',userRoute);
app.use('/category',categoryRoute);
app.use('/products',productRoute);
app.use('/order',orderRoute)

//database connection
mongoose.connect(process.env.Database_URL).then(()=>{
    console.log("Database Connected Successfully")
}).catch((err)=>{
    if (err)
        throw err
})

//server connection
app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
})