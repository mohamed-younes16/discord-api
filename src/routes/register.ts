import { Router } from "express"

const registerUser = require("../controllers/registerController")

const router = Router()


router.post("/",registerUser)

module.exports = router