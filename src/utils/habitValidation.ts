import { z } from "zod";

export const createHabitSchema = z.object({
    title: z.string().min(1, "Habit title is required"),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;