"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMIddleware = void 0;
const logger_1 = require("../utils/logger");
const ErrorMIddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).json({ message });
    }
    catch (error) {
        logger_1.logger.log('debug', error.message);
        next(error);
    }
};
exports.ErrorMIddleware = ErrorMIddleware;
