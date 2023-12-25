import { Router } from "express";
import PatchUsersController from "../controllers/PatchUsersController";
const GetUsersController = require("../controllers/GetUsersController");
// const PatchUsersController = require("../controllers/PatchUsersController");

const router = Router();

router.get("/access", GetUsersController);

router.patch("/update", PatchUsersController);
module.exports = router;
