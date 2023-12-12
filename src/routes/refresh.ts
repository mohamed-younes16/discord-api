import { Router } from "express"

const refreshController = require("../controllers/refreshController")

const router = Router()


router.get("/",refreshController)

module.exports = router