"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, NODE_ENV, PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT, PGDATABASETEST } = process.env;
exports.default = {
    PORT: PORT,
    db_host: PGHOST,
    db_port: PGPORT,
    db_password: PGPASSWORD,
    db_name: NODE_ENV == 'dev' ? PGDATABASE : PGDATABASETEST,
    db_user: PGUSER,
};
