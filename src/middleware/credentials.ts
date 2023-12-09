import { NextFunction, Request, Response } from "express"

const {allowedlist} = require("../config/corsOptions")

export const credentials = (req:Request , res:Response , next:NextFunction) => {
   
    const origin = req.headers.origin

    if(allowedlist.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true")
    }

  next()
}

