import sql from 'mysql2'
import * as dotenv from 'dotenv'
dotenv.config()

export default sql.createPool({
    database: process.env.database,
    password: process.env.database_password,
    host: process.env.host,
    user: process.env.user,
});
