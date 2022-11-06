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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../config/database"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const index_1 = __importDefault(require("../../index"));
const userModel = new user_model_1.default();
const request = (0, supertest_1.default)(index_1.default.app);
let token = '';
describe('User API Endpoints', () => {
    const user = {
        email: "test@test.com",
        user_name: "testUser",
        first_name: "Test",
        last_name: "user",
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
    describe('Test auth methods', () => {
        it('Should be able to authenticate to get token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/login')
                .set('content-type', 'application/json')
                .send({
                email: 'test@test.com',
                password: 'test123',
            });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe('test@test.com');
            token = userToken;
        }));
        it('Should be able to authenticate with wrong email', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/login')
                .set('content-type', 'application/json')
                .send({
                email: 'testwrong@test.com',
                password: 'test@123',
            });
            expect(res.status).toBe(401);
        }));
    });
    describe('Test CRUD API methods', () => {
        it('Should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                email: "email31@test.com",
                user_name: "test31",
                first_name: "test",
                last_name: "31app",
                password: "test@1234"
            });
            expect(res.status).toBe(200);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe("email31@test.com");
            expect(user_name).toBe("test31");
            expect(first_name).toBe("test");
            expect(last_name).toBe("31app");
        }));
        it('Should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        }));
        it('Should get user info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/users/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.email).toBe("test@test.com");
            expect(res.body.data.user_name).toBe("testUser");
        }));
        it('Should update user info', () => __awaiter(void 0, void 0, void 0, function* () {
            user.user_name = 'alilabib';
            user.first_name = 'ali';
            user.last_name = 'labib';
            const res = yield request
                .put(`/api/users/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign({}, user));
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(user.id);
            expect(res.body.data.email).toBe("test@test.com");
            expect(res.body.data.user_name).toBe("alilabib");
            expect(res.body.data.first_name).toBe("ali");
            expect(res.body.data.last_name).toBe("labib");
        }));
        it('Should delete user ', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/api/users/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(user.id);
        }));
    });
});
