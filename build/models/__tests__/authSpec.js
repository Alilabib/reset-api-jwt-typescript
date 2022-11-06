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
const user_model_1 = __importDefault(require("../user.model"));
const database_1 = __importDefault(require("../../config/database"));
const userModel = new user_model_1.default();
describe('Authntication module', () => {
    describe('Test methods exists', () => {
        it('should have an Authntication user method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test Authentication Logic', () => {
        const user = {
            email: "test@test.com",
            user_name: "testUser",
            first_name: "Test",
            last_name: "User",
            password: "test123"
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create(user);
            user.id = createdUser.id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM users;';
            yield connection.query(sql);
            connection.release();
        }));
        it('Authenticate method should return the authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const authUser = yield userModel.authenticate(user.email, user.password);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.email).toBe(user.email);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.user_name).toBe(user.user_name);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.first_name).toBe(user.first_name);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.last_name).toBe(user.last_name);
        }));
        it('Authenticate method should return null for wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const authUser = yield userModel.authenticate('email@email.com', 'fake-password');
            expect(authUser).toBe(null);
        }));
    });
});
