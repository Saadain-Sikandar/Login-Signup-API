import express from "express";
import { SignupController } from "../Controller/SignupController.js";
import { LoginController } from "../Controller/loginController.js";

const router = express.Router();

router.post("/signup", SignupController);
router.post("/login", LoginController);

export default router;