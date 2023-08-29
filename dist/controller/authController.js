"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const typedi_1 = require("typedi");
const auth_service_1 = require("../services/auth.service");
const AppError_1 = require("../utils/AppError");
const logger_1 = require("../utils/logger");
// import jwt from 'jsonwebtoken'
class AuthController {
    constructor() {
        this.auth = typedi_1.Container.get(auth_service_1.AuthService);
        this.signup = async (req, res, next) => {
            try {
                const userData = req.body;
                const { email, password, name } = userData;
                if (!email || !password || !name) {
                    throw new AppError_1.AppError(400, 'All fields must be provided');
                }
                const signupUser = await this.auth.singup(userData);
                res.status(201).json({
                    data: signupUser,
                    message: 'User signed up successfully',
                    token: signupUser.token
                });
            }
            catch (error) {
                logger_1.logger.log('error', error.message);
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
