
const employeeShema = require("../schemas/employeeShema")



const getallemps = async (req, res)=>{  
    const epmsdata = await  employeeShema.find()
    res.status(200).json(epmsdata)
}

const postemps =async (req, res)=>{  
    const isUnique = await employeeShema.findOne({firstName: req.body.firstName });
    if (isUnique) return res.status(401).json({ "error": "firstName must be unique" });
    

try {
     const data = await employeeShema.create({
        lastName:req.body.lastName,
        firstName:req.body.firstName,
        salary:req.body.salary
    })
    res.json(data)
} catch (error) {
return res.status(400).json({"message": error.message})
}

}

const patchemps = async (req, res)=>{  
    const _id = req?.body?._id

    if(!_id) return res.status(400).json({"error":"no id provided"})

    const patch = {...req.body}
    delete patch._id
    

    const wantedEmployee = await employeeShema.findByIdAndUpdate(_id,{
    $set:patch
    },{new:true})


    res.json(wantedEmployee)

}

const deleteemps = async (req, res)=>{ 
    const _id = req?.body?._id

    if(!_id) return res.status(400).json({"error":"no id provided"})

    const result = await employeeShema.findByIdAndDelete(_id)

    res.json(result)
}


const getspecificemp = async  (req, res)=>{ 

    const _id =req?.params?.id

    if(!_id) return res.status(400).json({"error":"no id provided"})

    const wantedEmployee = await employeeShema.findById(_id)

    res.json(wantedEmployee)
}

module.exports ={
    getallemps,
    getspecificemp,deleteemps,patchemps,postemps
}