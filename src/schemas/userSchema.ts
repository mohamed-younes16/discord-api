import mongoose from "mongoose"



const userSchema = new mongoose.Schema({
    
        username:{
            type: String,
            required: true,
            unique: true
        
        },
        pass:{
            type: String,
            required: true
        },
    
        roles: {
        admin: Number,
        editor: Number,
        user : {
            type : Number , 
            default:555
        }
        },
        refreshToken: String
    
})

module.exports = mongoose.model("User",userSchema)