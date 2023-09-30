const loginuser = require("../controllers/loginController")

const router = require("express").Router()


router.post("/",loginuser)

module.exports = router