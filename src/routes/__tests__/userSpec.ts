import supertest from "supertest";
import db from '../../config/database';
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import server from '../../index';

const userModel = new UserModel();
const request = supertest(server.app);
let token = '';

describe('User API Endpoints',()=>{
    const user = {
        email:"test@test.com",
        user_name:"testUser",
        first_name:"Test",
        last_name:"user",
        password:"test123"
    }as User;

    beforeAll(async()=>{
        const createdUser = await userModel.create(user);
        user.id = createdUser.id;
    });

    afterAll(async()=>{
        const connection = await db.connect();
        const sql = 'DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });

    describe('Test auth methods',()=>{
        it('Should be able to authenticate to get token',async()=>{
            const res = await request
            .post('/api/users/login')
            .set('content-type','application/json')
            .send({
                email:'test@test.com',
                password:'test123',
            });
            expect(res.status).toBe(200);
            const {id, email, token:userToken} =res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe('test@test.com');
            token = userToken;
        });

        it('Should be able to authenticate with wrong email',async()=>{
            const res = await request
            .post('/api/users/login')
            .set('content-type','application/json')
            .send({
                email:'testwrong@test.com',
                password:'test@123',
            });
            expect(res.status).toBe(401);
        });
    });

    describe('Test CRUD API methods',()=>{
        it('Should create new user',async()=>{
            const res = await request
            .post('/api/users')
            .set('content-type','application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({
                email:"email31@test.com",
                user_name:"test31",
                first_name:"test",
                last_name:"31app",
                password:"test@1234"
            }as User);
            expect(res.status).toBe(200);
            const {email, user_name, first_name, last_name} = res.body.data;
            expect(email).toBe("email31@test.com");
            expect(user_name).toBe("test31");
            expect(first_name).toBe("test");
            expect(last_name).toBe("31app");
        });

        it('Should create new user',async()=>{
            const res = await request
            .get('/api/users')
            .set('content-type','application/json')
            .set('Authorization',`Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        });


        it('Should get user info',async()=>{
            const res = await request
            .get(`/api/users/${user.id}`)
            .set('content-type','application/json')
            .set('Authorization',`Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.email).toBe("test@test.com");
            expect(res.body.data.user_name).toBe("testUser");

        });

        it('Should update user info',async()=>{
            user.user_name = 'alilabib';
            user.first_name = 'ali';
            user.last_name = 'labib';
            const res = await request
            .put(`/api/users/${user.id}`)
            .set('content-type','application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({
                ...user
            });
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(user.id);
            expect(res.body.data.email).toBe("test@test.com");
            expect(res.body.data.user_name).toBe("alilabib");
            expect(res.body.data.first_name).toBe("ali");
            expect(res.body.data.last_name).toBe("labib");
        });

        it('Should delete user ',async()=>{
            const res = await request
            .delete(`/api/users/${user.id}`)
            .set('content-type','application/json')
            .set('Authorization',`Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(user.id);
        });
    });
});
