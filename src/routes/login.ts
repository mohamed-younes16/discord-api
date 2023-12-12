import { Router } from "express"

const loginuser = require("../controllers/loginController")

const router = Router()


router.post("/",loginuser)

module.exports = router