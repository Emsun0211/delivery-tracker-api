import { NextFunction, Request, Response } from "express";
import {Container, Service} from 'typedi'
import {AuthService} from '../services/auth.service'
import {UserSignup} from '../dtos/user.dto'

export class AuthController {
    private auth = Container.get(AuthService)
    public  signup = async(req: Request, res: Response, next: NextFunction) => {
       try {
        const userData: UserSignup = req.body
        const signupUser = this.auth.singup(userData)
        res.status(201).json({
            data: signupUser,
            message: 'User signed up successfully'
        })
       } catch (error) {
        console.log(error)
       } 
    }
}