import { Router } from "express";
import PatchUsersController from "../controllers/PatchUsersController";
const GetUsersController = require("../controllers/GetUsersController");
const PostUserChatController = require("../controllers/PostUserChatController");

const router = Router();

router.get("/access", GetUsersController);
router.patch("/update", PatchUsersController);

router.post("/chat", PostUserChatController);
module.exports = router;
