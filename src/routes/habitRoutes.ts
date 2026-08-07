import { Router } from "express";
import { createHabitController, getHabitsController, updateHabitController } from "@/controllers/habitController";
import { asyncHandler } from "@/middleware/errorHandler";
import { requireAuth } from "@/middleware/requireAuth";

const router = Router();

router.post("/create", requireAuth, asyncHandler(createHabitController));
router.get("/", requireAuth, asyncHandler(getHabitsController));
router.patch("/:id/update", requireAuth, asyncHandler(updateHabitController));

export default router;