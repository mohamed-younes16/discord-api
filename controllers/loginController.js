const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const userSchema = require("../schemas/userSchema")






const loginuser = async (req, res)=>{

    const {username,pass} = req.body
    

    const target = await userSchema.findOne({username })

    if (!target || ( !username && !pass  ) ) return res.status(404).json({"message":"user not found or no valid data passed "})

    const rightpass  = await bcrypt.compare(pass , target.pass)

    if (!rightpass ) return  res.status(401).json({"message": "wrong password"})
            if (rightpass) { 

                const roles = Object.values(target.roles)



                const accessToken = jwt.sign(
                {
                "userinfo": { 
                            "username":target.username,
                            roles
                    }
                }
                ,process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"500s"})




                const refreshToken = jwt.sign({
                    "username":target.username
                },process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:"1d"})


                
                const upres = await userSchema.findOneAndUpdate({username},{refreshToken},{new:true})
                


                res.cookie("jwt",refreshToken,{httpOnly:true,sameSite:"None",maxAge:24*60*60*1000})


                res.json({accessToken})    

            }
    }

module.exports = loginuser