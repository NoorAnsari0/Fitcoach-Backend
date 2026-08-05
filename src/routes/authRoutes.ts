import { Router } from "express";
import { signupController, loginController, meController } from "../controllers/authController";
import { asyncHandler } from "@/middleware/errorHandler";
import { requireAuth } from "@/middleware/requireAuth";

const router = Router();
router.post("/signup", asyncHandler(signupController));
router.post("/login", asyncHandler(loginController));
router.get("/me", requireAuth, asyncHandler(meController));
export default router;