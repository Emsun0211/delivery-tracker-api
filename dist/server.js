"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connectDB = async () => {
    try {
        const connect = await mongoose_1.default.connect(`mongodb+srv://emsun:${process.env.DB_PASSWORD}@cluster0.nyudlgz.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Database connected", connect.connection.host, connect.connection.name);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = connectDB;
