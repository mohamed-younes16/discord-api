import { Router } from "express"

const stateUser = require("../controllers/stateController")

const router = Router()


router.get("/",stateUser)

module.exports = router