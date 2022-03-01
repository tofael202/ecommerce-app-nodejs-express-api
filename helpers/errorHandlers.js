function errorHandler(err,req,res,next){
    return res.json({message:err})
}
module.exports=errorHandler