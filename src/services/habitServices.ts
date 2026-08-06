import { prisma } from "../config/prisma";
import { CreateHabitInput } from "@/utils/habitValidation";

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
        where: {userId},
        orderBy: {date: "desc"}
    });

    return habits;
}