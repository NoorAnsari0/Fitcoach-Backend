import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export interface AuthRequest extends Request {
    userId?: string;
}

export function requireAuth(req: AuthRequest, _res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        throw new AppError("Missing or invalid authorization header", 401);
    }

    const token = header.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
        }
        req.userId = payload.userId;
        next();
    } catch {
        throw new AppError("Invalid or expired token", 401)
    }

}