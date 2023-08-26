"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    storeId: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Store' }]
});
exports.userModel = (0, mongoose_1.model)('User', userSchema);
