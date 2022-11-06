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
describe('User Module', () => {
    describe('Test methods exists', () => {
        it('should have an Get Many Users method', () => {
            expect(userModel.getMany).toBeDefined();
        });
        it('should have Get one User method', () => {
            expect(userModel.getOne).toBeDefined();
        });
        it('should have create User method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have update User method', () => {
            expect(userModel.updateOne).toBeDefined();
        });
        it('should have delete User method', () => {
            expect(userModel.deleteOne).toBeDefined();
        });
        it('Should have an Auth User method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test User Module', () => {
        const user = {
            email: 'test@test.com',
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
        it('Create method should return a New User', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create({
                email: "test2@test.com",
                user_name: "test2User",
                first_name: "Test2",
                last_name: "User",
                password: "test123"
            });
            expect(createdUser).toEqual({
                id: createdUser.id,
                email: 'test2@test.com',
                user_name: 'test2User',
                first_name: "Test2",
                last_name: "User",
            });
        }));
        it('Get Many method should return All available users in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel.getMany();
            expect(users.length).toEqual(2);
        }));
        it('Get One method should return testUser when called with ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const singleUser = yield userModel.getOne(user.id);
            expect(singleUser.id).toBe(user.id);
            expect(singleUser.email).toBe(user.email);
            expect(singleUser.user_name).toBe(user.user_name);
            expect(singleUser.first_name).toBe(user.first_name);
            expect(singleUser.last_name).toBe(user.last_name);
        }));
        it('Get One method should update testUser when depend on ID', () => __awaiter(void 0, void 0, void 0, function* () {
            user.user_name = 'alilabib';
            user.first_name = 'ali';
            user.last_name = 'khater';
            const updatedeUser = yield userModel.updateOne(user.id, Object.assign({}, user));
            expect(updatedeUser.id).toBe(user.id);
            expect(updatedeUser.email).toBe(user.email);
            expect(updatedeUser.user_name).toBe('alilabib');
            expect(updatedeUser.first_name).toBe('ali');
            expect(updatedeUser.last_name).toBe('khater');
        }));
        it('Delete One method should delete testUser from DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedUser = yield userModel.deleteOne(user.id);
            expect(deletedUser.id).toBe(user.id);
        }));
    });
});
