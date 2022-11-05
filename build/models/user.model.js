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
const database_1 = __importDefault(require("../config/database"));
class UserModel {
    //create user
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection from db
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO users(email, user_name, first_name, last_name, password)
            values ($1, $2, $3, $4, $5) returning id,email,user_name,first_name,last_name`;
                //run query
                const result = yield connection.query(sql, [user.email, user.user_name, user.first_name, user.last_name, user.password]);
                //realse connection
                connection.release();
                //return result 
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create user (${user.user_name}) : ${error.message}`);
            }
        });
    }
    //get all users
    getMany() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection from db
                const connection = yield database_1.default.connect();
                const sql = `SELECT id, email, user_name, first_name, last_name from users`;
                //run query
                const result = yield connection.query(sql);
                //realse connection
                connection.release();
                //return result 
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error at retrieving users ${error.message}`);
            }
        });
    }
    //get single user
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection from db
                const connection = yield database_1.default.connect();
                const sql = `SELECT id, email, user_name, first_name, last_name from users where id=($1)`;
                //run query
                const result = yield connection.query(sql, [id]);
                //realse connection
                connection.release();
                //return result 
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error at get user ${error.message}`);
            }
        });
    }
    //update user
    updateOne(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection from db
                console.log(user);
                const connection = yield database_1.default.connect();
                const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 where id=($6) 
            returning id,email,user_name,first_name,last_name`;
                //run query
                const result = yield connection.query(sql, [
                    user.email,
                    user.user_name,
                    user.first_name,
                    user.last_name,
                    user.password,
                    id
                ]);
                //realse connection
                connection.release();
                //return result 
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error at update user ${error.message}`);
            }
        });
    }
    //delete user
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection from db
                const connection = yield database_1.default.connect();
                const sql = `DELETE from users where id=($1) returning id,email,user_name,first_name,last_name`;
                //run query
                const result = yield connection.query(sql, [
                    id
                ]);
                //realse connection
                connection.release();
                //return result 
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error at delete user ${error.message}`);
            }
        });
    }
}
exports.default = UserModel;
