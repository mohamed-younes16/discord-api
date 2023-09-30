const jwt = require("jsonwebtoken")
const userSchema = require("../schemas/userSchema")






const handleRefreshToken = async (req, res)=>{

    const cookies = req.cookies
    if(!cookies?.jwt ) return res.status(401).json({"message": "you might be not logged-in to do this operation "})


    const refreshToken = cookies.jwt

    const target =  await userSchema.findOne({refreshToken}) 

    if (!target ) return res.status(404).json({"message":"user not found or no data passed "})

    jwt.verify(
        refreshToken ,
        process.env.REFRESH_TOKEN_SECRET , 

        (err , decoded) =>{
            
            if(err || target.username !== decoded.username) return res.sendStatus(403)
            
            const accesstoken = jwt.sign({

                "userinfo": {
                    "username": decoded.username,
                    "roles":Object.values(target.roles)
                }
                },

                process.env.ACCESS_TOKEN_SECRET,

                {expiresIn:"30s"})

                res.status(200).json({accesstoken})

        }
    )

    }

module.exports = handleRefreshToken