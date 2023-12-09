import { Request ,Response,NextFunction} from "express"

const jwt = require("jsonwebtoken")



const verifyJWT = async (req:any,res:any,next:NextFunction)=>{

const jwttoken = req.headers?.authorization?.split(' ')[1].trim() ||
 req.headers?.Authorization?.split(' ')[1].trim()

if (!jwttoken) return res.status(401).json({"error":"no token provided"})

jwt.verify(jwttoken ,process.env.ACCESS_TOKEN_SECRET,(e:any,decoded:any)=>{

    if (e){

        return res.status(401).json({"error":`${e.message } expired at || ${ e.expiredAt} ||`})

        } 

    req.user = decoded.userinfo.username
    req.roles = decoded.userinfo.roles
next() 
})  

}

module.exports = verifyJWT