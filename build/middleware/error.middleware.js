"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Whoops!! something went wrong';
    res.status(status).json({ status, message });
};
exports.default = errorMiddleware;
