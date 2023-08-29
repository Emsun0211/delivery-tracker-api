"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
const interfaces_1 = require("../utils/interfaces");
const OtpSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: Object.values(interfaces_1.OtpType),
    },
    otp: {
        type: String,
        required: true,
    },
    otpExpiration: {
        type: Date,
        default: null,
    }
}, { timestamps: true });
exports.OtpModel = (0, mongoose_1.model)('OtpModel', OtpSchema);
