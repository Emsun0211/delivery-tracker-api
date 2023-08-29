"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.genrateOtp = void 0;
const otpModel_1 = require("../model/otpModel");
const genrateOtp = (len) => {
    const numberList = '1234567890';
    let OTP = '';
    for (let i = 0; i < len; i++) {
        OTP += numberList[Math.floor(Math.random() * numberList.length)];
    }
    return OTP;
};
exports.genrateOtp = genrateOtp;
const verifyOtp = async (user, type, otp) => {
    const existingOtp = await otpModel_1.OtpModel.findOne({
        type: type,
        otp: otp,
        user
    });
    let currentDate = new Date();
    if (!existingOtp || existingOtp.otpExpiration < currentDate) {
        return null;
    }
    return existingOtp._id;
};
exports.verifyOtp = verifyOtp;
