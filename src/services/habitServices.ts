import { AppError } from "@/utils/AppError";
import { prisma } from "../config/prisma";
import { CreateHabitInput, updateHabitInput } from "@/utils/habitValidation";

export async function createHabit(userId: string, input: CreateHabitInput) {
    const habit = await prisma.habitEntry.create({
        data: {
            userId,
            title: input.title
        }
    });

    return habit;
}

export async function getHabits(userId: string) {
    const habits = await prisma.habitEntry.findMany({
        where: { userId },
        orderBy: { date: "desc" }
    });

    return habits;
}

export async function updateHabit(userId: string, habitId: string, input: updateHabitInput) {
    const habit = await prisma.habitEntry.findUnique({
        where: { id: habitId }
    });

    if (!habit) {
        throw new AppError("Habit not found", 404);
    }

    if (habit.userId !== userId) {
        throw new AppError("Not authorized to update this habit", 403);
    }

    const updated = await prisma.habitEntry.update({
        where: { id: habitId },
        data: {
            completed: input.completed
        }
    });
    
    return updated;
}