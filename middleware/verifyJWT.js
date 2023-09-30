const jwt = require("jsonwebtoken")



const verifyJWT = async (req,res,next)=>{

const jwttoken = req.headers?.authorization?.split(' ')[1] || req.headers?.Authorization?.split(' ')[1]

if (!jwttoken) return res.status(401).json({"error":"no token provided"})

jwt.verify(jwttoken ,process.env.ACCESS_TOKEN_SECRET,(e,decoded)=>{

    if (e){
    
        return res.status(401).json({"error":`${e.message } expired at || ${ e.expiredAt} ||`})

        } 

    req.user = decoded.userinfo.username
    req.roles = decoded.userinfo.roles
next() 
})  

}

module.exports = verifyJWT