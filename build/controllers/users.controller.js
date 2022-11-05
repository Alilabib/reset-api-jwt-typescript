"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteOne = exports.updateOne = exports.getOne = exports.getMany = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../config/app"));
const userModel = new user_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.create(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, user),
            message: "User Created Successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getMany = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.getMany();
        res.json({
            status: 'success',
            data: users,
            message: "Users Successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMany = getMany;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getOne(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: "User Get Successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOne = getOne;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.updateOne(req.params.id, req.body);
        res.json({
            status: 'success',
            data: user,
            message: "User Updated Successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOne = updateOne;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.deleteOne(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: "User Deeleted Successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOne = deleteOne;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.authenticate(req.body.email, req.body.password);
        const token = jsonwebtoken_1.default.sign({ user }, app_1.default.jwt_secret);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: "the username and password do not match please try again"
            });
        }
        res.json({
            status: 'success',
            data: Object.assign(Object.assign({}, user), { token }),
            message: "Login Successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
