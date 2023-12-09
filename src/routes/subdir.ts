import { Request, Response, Router } from "express";
import path from "path";

const router = Router();

router.get('^/$|/index(.html)?', (req: Request, res: Response) => {  
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get('/sub-index', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "sub.html"));
});

module.exports = router;
