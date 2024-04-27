import express from "express";
import { adminRegister } from "../controllers/adminAuth/index.js"
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", (req, res) => {
    res.send("This is the admin page");
    });

router.post("/", adminRegister);


export default router;
