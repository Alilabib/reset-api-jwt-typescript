import { Pool } from "pg";
import config  from './app';

const pool = new Pool({
    host:config.db_host,
    database:config.db_name,
    user:config.db_user,
    password:config.db_password,
    port:parseInt(config.db_port as string, 10),
});

pool.on('error',(error:Error)=>{
    console.warn(error.message);
});

export default pool;