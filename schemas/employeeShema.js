const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema({
    firstName:{
        type: String, 
        required: true,
        unique: true
    },
    lastName:{
        type: String, 
        required: true
    },
    salary: {
        type: Number, 
        default:2000
    }
}) 

module.exports = mongoose.model('Employee', employeeSchema)