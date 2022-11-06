import UserModel from "../user.model";
import database from '../../config/database';
import User from "../../types/user.type";

const userModel = new UserModel();

describe('User Module',()=>{
    describe('Test methods exists',()=>{
        it('should have an Get Many Users method',()=>{
            expect(userModel.getMany).toBeDefined();
        });

        it('should have Get one User method',()=>{
            expect(userModel.getOne).toBeDefined();
        });

        it('should have create User method',()=>{
            expect(userModel.create).toBeDefined();
        });

        it('should have update User method',()=>{
            expect(userModel.updateOne).toBeDefined();
        });

        it('should have delete User method',()=>{
            expect(userModel.deleteOne).toBeDefined();
        });

        it('Should have an Auth User method',()=>{
            expect(userModel.authenticate).toBeDefined();
        });
    });

   describe('Test User Module',()=>{
      const user = {
        email:'test@test.com',
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

      it('Create method should return a New User',async()=>{
         const createdUser = await userModel.create({
            email:"test2@test.com",
            user_name:"test2User",
            first_name:"Test2",
            last_name:"User",
            password:"test123" as string
         }as User);

         expect(createdUser).toEqual({
            id:createdUser.id,
            email:'test2@test.com',
            user_name:'test2User',
            first_name:"Test2",
            last_name:"User",
         }as User);
      });

      it('Get Many method should return All available users in DB', async()=>{
        const users =await userModel.getMany();
        expect(users.length).toEqual(2);
      });

      it('Get One method should return testUser when called with ID', async()=>{
        const singleUser = await userModel.getOne(user.id as string);
        expect(singleUser.id).toBe(user.id);
        expect(singleUser.email).toBe(user.email);
        expect(singleUser.user_name).toBe(user.user_name);
        expect(singleUser.first_name).toBe(user.first_name);
        expect(singleUser.last_name).toBe(user.last_name);
      });

      it('Get One method should update testUser when depend on ID', async()=>{
        user.user_name = 'alilabib';
        user.first_name = 'ali';
        user.last_name ='khater';
        const updatedeUser = await userModel.updateOne(user.id as string,{
            ...user
        });
        expect(updatedeUser.id).toBe(user.id);
        expect(updatedeUser.email).toBe(user.email);
        expect(updatedeUser.user_name).toBe('alilabib');
        expect(updatedeUser.first_name).toBe('ali');
        expect(updatedeUser.last_name).toBe('khater');
      });

      it('Delete One method should delete testUser from DB', async()=>{
        const deletedUser = await userModel.deleteOne(user.id as string);
        expect(deletedUser.id).toBe(user.id);

      });
   }); 
});