import { Router } from "express";
const GetUsersController = require("../controllers/GetUsersController");

const router = Router();

router.get("/access", GetUsersController);

module.exports = router;
