const router = require("express").Router()
const path  = require("path")
 

router.get('^/$|/index(.html)?', (req, res)=>{  
    res.sendFile(path.join(__dirname ,"..", "views","subdir",`index.html`))
})   


router.get('/sub-index', (req, res)=>{

    res.sendFile(path.join(__dirname ,"..", "views","subdir", `sub.html`))
 
}) 

module.exports = router