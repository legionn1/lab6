const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'students',
    password: '123',
    port: 5432,
});
module.exports = {
    query: (text, params) => pool.query(text, params),
}