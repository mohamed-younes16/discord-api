const jwt = require("jsonwebtoken")
const userSchema = require("../schemas/userSchema")




const  logoutController = async (req, res)=>{

    const cookies = req.cookies 
    if(!cookies?.jwt ) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    const target = await userSchema.findOneAndDelete({refreshToken}) 


    if (!target ){ 
        res.clearCookie("jwt",{sameSite:"None",httpOnly:true,maxAge:24*60*60*1000})
        return res.sendStatus(403)
    }
    res.clearCookie("jwt",{sameSite:"None",httpOnly:true,maxAge:24*60*60*1000})
    res.sendStatus(200)
    }

module.exports =  logoutController 