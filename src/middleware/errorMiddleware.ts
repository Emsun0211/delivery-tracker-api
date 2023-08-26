 import { AppError } from "../utils/AppError";
 import { Request, Response, NextFunction } from "express";



 export const ErrorMIddleware = (error: AppError, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong'

        res.status(status).json({ message});
    } catch (error) {
        next(error);
    }
 }