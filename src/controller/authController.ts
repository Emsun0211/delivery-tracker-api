import { NextFunction, Request, Response } from "express";
import {Container, Service} from 'typedi'
import {AuthService} from '../services/auth.service'
import {UserSignup} from '../dtos/user.dto'
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
// import jwt from 'jsonwebtoken'

export class AuthController {
    private auth = Container.get(AuthService)

   
    public  signup = async(req: Request, res: Response, next: NextFunction) => {
       try {
        const userData: UserSignup = req.body
        const {email, password, name} = userData;
        if(!email || !password || !name) {
            throw new AppError(400, 'All fields must be provided')
        }
        const signupUser = await this.auth.singup(userData)
        res.status(201).json({
            data: signupUser,
            message: 'User signed up successfully',
            token: signupUser.token
        })
       } catch (error: any) {
        logger.log('error', error.message)
        next(error)
       } 
    }
}