import { Request, Response } from "express"

const router = require("express").Router()
const path  = require("path")
 








router.get('^/$|/index(.html)?', (req:Request, res:Response)=>{  

    res.sendFile(path.join(__dirname ,"..", "views",`index.html`))


})   


router.get('/new-index', (req:Request, res:Response)=>{

    res.sendFile(path.join(__dirname ,"..", "views", `new-page.html`))
 
}) 

router.get('/old', (req:Request, res:Response)=>{
    res.redirect("/new-index",301)

}) 



module.exports = router