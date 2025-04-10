
import {Pool} from 'pg';

const conn = new Pool({
    host: "localhost",
    database: "testdb",
    password: "impoyski0501",
    user: "postgres",
    port: 5432
})

export const query = (query: string, values: any[] = []) => conn.query(query, values)