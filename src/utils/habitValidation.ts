import { z } from "zod";

export const createHabitSchema = z.object({
    title: z.string().min(1, "Habit title is required"),
});

export const updateHabitSchema = z.object({
    completed: z.boolean(),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type updateHabitInput = z.infer<typeof updateHabitSchema>;