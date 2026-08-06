import { Request, Response } from "express";
import * as authService from "../services/authService";
import { signupSchema, loginSchema } from "../utils/validations";
import { AppError } from "../utils/AppError";
import { AuthRequest } from "../middleware/requireAuth";

export async function signupController(req: Request, res: Response) {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new AppError(parsed.error.errors[0].message, 400);
    }

    const result = await authService.signup(parsed.data);

    res.status(201).json({
        success: true,
        data: result

    });
}

export async function loginController(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new AppError(parsed.error.errors[0].message, 400);
    }

    const result = await authService.login(parsed.data);
    res.status(200)
        .json(result);
}

export async function meController(req: AuthRequest, res: Response) {
    if (!req.userId) {
        throw new AppError("Not Authenticated", 401)
    }
    const profile = await authService.getProfile(req.userId);
    res.status(200).json(profile);
}
