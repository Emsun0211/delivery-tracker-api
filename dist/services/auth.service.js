"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const userModel_1 = require("../model/userModel");
const typedi_1 = require("typedi");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
let AuthService = exports.AuthService = class AuthService {
    async getUserByEmail(email) {
        const user = await userModel_1.userModel.findOne({ email });
        return user;
    }
    createToken(data) {
        let token;
        try {
            //Creating jwt token
            token = jsonwebtoken_1.default.sign(data, "secretkeyappearshere", { expiresIn: "1h" });
        }
        catch (err) {
            console.log(err);
        }
        return token;
    }
    async singup(data) {
        console.log(data);
        const existingUser = await this.getUserByEmail(data.email);
        if (existingUser) {
            new AppError_1.AppError(400, 'User already register');
        }
        const hashPassword = await (0, bcrypt_1.hash)(data.password, 10);
        const token = this.createToken(data);
        const createdUser = await userModel_1.userModel.create({
            name: data.name,
            email: data.email,
            password: hashPassword
        });
        return createdUser;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, typedi_1.Service)()
], AuthService);
