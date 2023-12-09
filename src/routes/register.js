const registerUser = require("../controllers/registerController")

const router = require("express").Router()


router.post("/",registerUser)

module.exports = router