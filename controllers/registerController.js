const bcrypt = require("bcrypt")

const userSchema = require("../schemas/userSchema")

const registerUser = async (req, res)=>{

const {username,pass} = req.body

const alredycreated = await userSchema.findOne({username: username})



if (alredycreated || ( !username && !pass  )) return  res.status(409).json({
        "error": "User already exists or nodata check again",
        "message": "A user with this username already exists or no data passed ."
    })

try {

const hashedpass = await bcrypt.hash(pass,12)

const result = await userSchema.create({

    username,
        pass:hashedpass
    }) 



res.status(201).json({'message':`registered ${username} successfully👌☑️`})

}  

catch (error) {res.status(500).send(error.message)}

}





module.exports = registerUser