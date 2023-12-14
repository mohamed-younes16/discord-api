import { Router } from "express";
const GetServersontoller = require("../controllers/GetServersontoller");
const PostServersontoller = require("../controllers/PostServersController");
const PatchServersontoller = require("../controllers/PatchServersController");
const DeleteServersontoller = require("../controllers/DeleteServersController");


const router = Router();

router.get("/access", GetServersontoller);
router.post("/create", PostServersontoller);
router.delete("/delete", DeleteServersontoller);
router.patch("/update", PatchServersontoller);

module.exports = router;
