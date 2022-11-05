import User from "../types/user.type";
import db from '../config/database';
import app from "../config/app";
import bcrypt from 'bcrypt';
const hashPassowrd =(password:string)=>{
    const salt = parseInt(app.secret_rounds as string,10);
    return bcrypt.hashSync(`${password}${app.secret}`,salt)
}

class UserModel{
    //create user
    async create(user:User):Promise<User>{
        try {
            //open connection from db
            const connection = await db.connect();
            const sql = `INSERT INTO users(email, user_name, first_name, last_name, password)
            values ($1, $2, $3, $4, $5) returning id,email,user_name,first_name,last_name`;
            //run query
            const result = await connection.query(sql,[
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hashPassowrd(user.password)
            ]);
            //realse connection
            connection.release();
            //return result 
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create user (${user.user_name}) : ${(error as Error).message}`);
        }
    }
    //get all users
    async getMany():Promise<User[]>{
        try {
            //open connection from db
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name from users`;
            //run query
            const result = await connection.query(sql);
            //realse connection
            connection.release();
            //return result 
            return result.rows;
        } catch (error) {
            throw new Error (`Error at retrieving users ${(error as Error).message}`);
        }
    }
    //get single user
    async getOne(id:string):Promise<User>{
        try {
            //open connection from db
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name from users where id=($1)`;
            //run query
            const result = await connection.query(sql,[id]);
            //realse connection
            connection.release();
            //return result 
            return result.rows[0];
        } catch (error) {
            throw new Error (`Error at get user ${(error as Error).message}`);
        }
    }
    //update user
    async updateOne(id:string,user:User):Promise<User>{
        try {
            //open connection from db
            console.log(user);
            const connection = await db.connect();
            const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 where id=($6) 
            returning id,email,user_name,first_name,last_name`;
            //run query
            const result = await connection.query(sql,[
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hashPassowrd(user.password),
                id
            ]);
            //realse connection
            connection.release();
            //return result 
            return result.rows[0];
        } catch (error) {
            throw new Error (`Error at update user ${(error as Error).message}`);
        }
    }
    //delete user
    async deleteOne(id:string):Promise<User>{
        try {
            //open connection from db
            const connection = await db.connect();
            const sql = `DELETE from users where id=($1) returning id,email,user_name,first_name,last_name`;
            //run query
            const result = await connection.query(sql,[
                id
            ]);
            //realse connection
            connection.release();
            //return result 
            return result.rows[0];
        } catch (error) {
            throw new Error (`Error at delete user ${(error as Error).message}`);
        }
    }
    //authenticate user
   async authenticate(email:string,password:string):Promise<User|null>{
      try{
        console.log(email);

        const connection = await db.connect();
        const sql = `SELECT password FROM users users Where email=$1`;
        const result = await connection.query(sql,[email]);

        if(!result.rows.length){
            return null
        }
        const {password : hashPassowrd } = result.rows[0];
        const isValidPassowrd = bcrypt.compareSync(`${password}${app.secret}`,hashPassowrd);
        if(!isValidPassowrd){
            return null
        }
        const userQuery = `SELECT id,email,user_name,first_name,last_name FROM users Where email=$1`;
        const userResult = await connection.query(userQuery,[email]);
        return userResult.rows[0];
      }catch(error){
        throw new Error (`Error at auth user ${(error as Error).message}`);
      } 
   }
}

export default UserModel;