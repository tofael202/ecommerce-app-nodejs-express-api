const expressJwt=require('express-jwt')


const secret='secret'
authJwt=expressJwt({
    secret,
    algorithms:['HS256']
}).unless({
    path:[
        {url:'/products', method:['GET']},
        '/user',
        '/login'
    ]
})

module.exports=authJwt