import dotenv from 'dotenv';
dotenv.config();
const { PORT,
    NODE_ENV,
    PGHOST,
    PGUSER,
    PGDATABASE,
    PGPASSWORD,
    PGPORT,
    PGDATABASETEST,
    BCRYPT_SECRET,
    SALT_ROUNDS,
    JWT_SECRET
} = process.env;
export default{
    PORT :PORT,
    db_host:PGHOST,
    db_port:PGPORT,
    db_password:PGPASSWORD,
    db_name: NODE_ENV == 'dev' ?  PGDATABASE : PGDATABASETEST,
    db_user:PGUSER,
    secret:BCRYPT_SECRET,
    secret_rounds:SALT_ROUNDS,
    jwt_secret:JWT_SECRET
}