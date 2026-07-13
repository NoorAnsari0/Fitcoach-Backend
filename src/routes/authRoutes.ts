import { Router } from "express";
import { signupController, loginController } from "../controllers/authController";
import { asyncHandler } from "@/middleware/errorHandler";

const router = Router();
router.post("/signup", asyncHandler(signupController));
router.post("/login", asyncHandler(loginController));
export default router;