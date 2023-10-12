require('dotenv').config()
const { jwt } = require("../model/jwt")
const prisma = require('../model/prisma')
const { createError } = require("../utilis/create-error")

module.exports = async (req,res,next) => {
try {
    
    
    const {authorization} = req.headers
    if(!authorization||!authorization.startsWith("Bearer ")){
        return next(createError('unAuthenticated',401))
    }
    
    const token = authorization.split(" ")[1]
    const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await prisma.user.findUnique({
        where:{
            id:payload.userId
        }
    })
    if(!user){
        return next(createError('unAuthenticated',401))
    }
    req.user = user
    next()
} catch (error) {
    if(
        error.name==='TokenExpiredError'||error.name==='JsonWebTokenError'
    )
    next(error)
}
}