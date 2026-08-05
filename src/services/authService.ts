import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { SignupInput, LoginInput } from "../utils/validations";

function generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    } as jwt.SignOptions);
}

export async function signup(input: SignupInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
        throw new AppError("An account with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = prisma.user.create({
        data: {
            email: input.email,
            passwordHash,
            name: input.name
        }
    });

    const token = generateToken((await user).id);

    return {
        token,
        user: {
            id: (await user).id, email: (await user).email, name: (await user).name
        }
    }
}

export async function login(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
        throw new AppError("Inavlid email or password", 401);
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id);

    return {
        token,
        user: { id: user.id, email: user.email, name: user.name }
    };
}

export async function getProfile(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, createdAt: true }
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}