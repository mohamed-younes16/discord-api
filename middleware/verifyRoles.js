const verifyRoles = (...rolesparams) => 
(req,res,next)=>{
const rolesSent = req.roles 

if(!rolesSent) return res.sendStatus(402)

const result =rolesSent.some(e=> [...rolesparams].includes(e)) 

if (!result) return res.sendStatus(401)
next()

}
module.exports = verifyRoles