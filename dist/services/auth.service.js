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
const interfaces_1 = require("../utils/interfaces");
const typedi_1 = require("typedi");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const otp_1 = require("../utils/otp");
const otpModel_1 = require("../model/otpModel");
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
        const existingUser = await this.getUserByEmail(data.email);
        if (existingUser) {
            throw new AppError_1.AppError(400, 'User already register');
        }
        const hashPassword = await (0, bcrypt_1.hash)(data.password, 10);
        const token = this.createToken(data);
        console.log(token);
        const createdUser = await userModel_1.userModel.create({
            name: data.name,
            email: data.email,
            password: hashPassword
        });
        const otp = (0, otp_1.genrateOtp)(6);
        let otpExpiration = new Date();
        otpExpiration = otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
        const createdOTP = new otpModel_1.OtpModel({
            user: createdUser._id,
            otp,
            otpExpiration,
            type: interfaces_1.OtpType.VERIFICATION
        });
        await createdOTP.save();
        console.log(createdUser);
        return { createdUser, token };
    }
    async completeSignup(data) {
        const { email, otp } = data;
        const user = await userModel_1.userModel.findOne({ email: email });
        if (!user) {
            throw new AppError_1.AppError(404, 'User not found');
        }
        if (user.isEmailVerified) {
            throw new AppError_1.AppError(400, 'User already verified');
        }
        if (user.isSignupCompleted) {
            throw new AppError_1.AppError(400, 'User is already signed up');
        }
        const userOtp = await otpModel_1.OtpModel.findOne({ user: user._id, type: interfaces_1.OtpType.VERIFICATION });
        if (!userOtp) {
            throw new AppError_1.AppError(400, 'No user found with this otp');
        }
        if (userOtp.otpExpiration < Date.now()) {
            throw new AppError_1.AppError(400, 'Otp has expired');
        }
        const isValidOtp = await (0, otp_1.verifyOtp)(user._id, interfaces_1.OtpType.VERIFICATION, otp);
        if (!isValidOtp) {
            throw new AppError_1.AppError(400, 'Invalid OTP');
        }
        const updateUser = await userModel_1.userModel.findByIdAndUpdate(user._id, { name: user.name, email: user.email, isSingupCompleted: true, isEmailVerified: true });
        await otpModel_1.OtpModel.deleteOne();
        return updateUser;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, typedi_1.Service)()
], AuthService);
