"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const app_1 = __importDefault(require("./app"));
const pool = new pg_1.Pool({
    host: app_1.default.db_host,
    database: app_1.default.db_name,
    user: app_1.default.db_user,
    password: app_1.default.db_password,
    port: parseInt(app_1.default.db_port, 10),
});
pool.on('error', (error) => {
    console.warn(error.message);
});
exports.default = pool;
