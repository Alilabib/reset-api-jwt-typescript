import UserModel from "../user.model";
import database from '../../config/database';
import User from "../../types/user.type";

const userModel = new UserModel();

describe('Authntication module',()=>{
    describe('Test methods exists',()=>{
        it('should have an Authntication user method',()=>{
            expect(userModel.authenticate).toBeDefined();

        });
    });

    describe('Test Authentication Logic',()=>{
        const user = {
            email:"test@test.com",
            user_name:"testUser",
            first_name:"Test",
            last_name:"User",
            password:"test123"
        } as User;

        beforeAll(async()=>{
            const createdUser = await userModel.create(user); 
            user.id = createdUser.id;
        });

        afterAll(async()=>{
            const connection = await database.connect();
            const sql = 'DELETE FROM users;';
            await connection.query(sql);
            connection.release();
        });

        it('Authenticate method should return the authenticated user',async()=>{
            const authUser = await userModel.authenticate(
                user.email,
                user.password as string
            );
            expect(authUser?.email).toBe(user.email);
            expect(authUser?.user_name).toBe(user.user_name);
            expect(authUser?.first_name).toBe(user.first_name);
            expect(authUser?.last_name).toBe(user.last_name);
        });

        it('Authenticate method should return null for wrong credentials',async()=>{
            const authUser = await userModel.authenticate(
                'email@email.com',
                'fake-password'
            );
            expect(authUser).toBe(null);
        });

    });


});