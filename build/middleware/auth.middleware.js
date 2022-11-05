"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../config/app"));
const handleUnauthorizedError = (next) => {
    const error = new Error('login Error: please try again');
    error.status = 401;
    next(error);
};
const validateTokenMiddleware = (req, _res, next) => {
    try {
        //get headers
        const authHeaders = req.get('Authorization');
        if (!authHeaders) {
            handleUnauthorizedError(next);
        }
        const bearer = authHeaders === null || authHeaders === void 0 ? void 0 : authHeaders.split(' ')[0].toLowerCase();
        const token = authHeaders === null || authHeaders === void 0 ? void 0 : authHeaders.split(' ')[1];
        if (!token || !bearer) {
            handleUnauthorizedError(next);
        }
        const decode = jsonwebtoken_1.default.verify(token, app_1.default.jwt_secret);
        if (!decode) {
            handleUnauthorizedError(next);
        }
        next();
        //check authHeaders validate 
        //get value of token
        //check if bearer tokn or not 
        //token type not bearer 
        //no  token provides        
    }
    catch (error) {
        handleUnauthorizedError(next);
    }
};
exports.default = validateTokenMiddleware;
