"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMIddleware = void 0;
const ErrorMIddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).json({ message });
    }
    catch (error) {
        next(error);
    }
};
exports.ErrorMIddleware = ErrorMIddleware;
