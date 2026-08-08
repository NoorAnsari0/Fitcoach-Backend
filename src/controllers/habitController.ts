import { Response } from "express";
import * as habitService from "../services/habitServices";
import { createHabitSchema, updateHabitSchema } from "@/utils/habitValidation";
import { AppError } from "@/utils/AppError";
import { AuthRequest } from "@/middleware/requireAuth";

export async function createHabitController(req: AuthRequest, res: Response) {
    if (!req.userId) {
        throw new AppError("Not AUthenticated", 401);
    }

    const parsed = createHabitSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new AppError(parsed.error.errors[0].message, 400);
    }

    const habit = await habitService.createHabit(req.userId, parsed.data);
    res.status(201).json({
        success: true,
        data: {
            habit: habit
        }
    });
}

export async function getHabitsController(req: AuthRequest, res: Response) {
    if (!req.userId) {
        throw new AppError("Not AUthenticated", 401)
    }

    const habits = await habitService.getHabits(req.userId);

    return res.status(200).json({
        success: true,
        data: { habits: habits }

    })
}

export async function updateHabitController(req: AuthRequest, res: Response) {
    if (!req.userId) {
        throw new AppError("Not Authenticated", 401)
    }

    const parsed = updateHabitSchema.safeParse(req.body);

    if (!parsed.success) {
        throw new AppError(parsed.error.errors[0].message, 400);
    }

    const habit = await habitService.updateHabit(req.userId, req.params.id, parsed.data)

    return res.status(200).json({
        success: true,
        data: {
            habit: habit
        }
    })
}

export async function deleteHabitController(req: AuthRequest, res: Response) {
    if (!req.userId) {
        throw new AppError("Not authorized", 401);
    }

    const result = await habitService.deleteHabit(req.userId, req.params.id);
    return res.status(200).json({
        success: true,
        message: "Habit deleted successfully"
    })
}