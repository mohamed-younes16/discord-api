import { Request ,Response,NextFunction} from "express"
interface CustomRequest extends Request {
    roles?: string[]; // Add this line to extend the Request interface
  }
const verifyRoles = (...rolesparams:string[]) => 
(req:CustomRequest,res:Response,next:NextFunction)=>{
const rolesSent = req.roles 

if(!rolesSent) return res.sendStatus(401)

const result =rolesSent.some(e=> [...rolesparams].includes(e)) 

if (!result) return res.sendStatus(401)
next()

}
module.exports = verifyRoles