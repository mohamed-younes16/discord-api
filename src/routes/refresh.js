const refreshController = require("../controllers/refreshController")

const router = require("express").Router()


router.get("/",refreshController)

module.exports = router