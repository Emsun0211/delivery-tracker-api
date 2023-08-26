"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const typedi_1 = require("typedi");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.auth = typedi_1.Container.get(auth_service_1.AuthService);
        this.signup = async (req, res, next) => {
            try {
                const userData = req.body;
                const signupUser = this.auth.singup(userData);
                res.status(201).json({
                    data: signupUser,
                    message: 'User signed up successfully'
                });
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
exports.AuthController = AuthController;
