const router = require("express").Router()
const path  = require("path")
 








router.get('^/$|/index(.html)?', (req, res)=>{  

    res.sendFile(path.join(__dirname ,"..", "views",`index.html`))


})   


router.get('/new-index', (req, res)=>{

    res.sendFile(path.join(__dirname ,"..", "views", `new-page.html`))
 
}) 

router.get('/old', (req, res)=>{
    res.redirect("/new-index",301)

}) 



module.exports = router