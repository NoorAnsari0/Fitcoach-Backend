import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message })
    }

    console.error("Unexpected Error:", err);
    return res.status(500).json({ error: "Something went wrong" });
}

export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
}