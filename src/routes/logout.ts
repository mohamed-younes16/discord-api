const logoutController = require("../controllers/logoutController")

const router = require("express").Router()


router.get("/", logoutController)

module.exports = router