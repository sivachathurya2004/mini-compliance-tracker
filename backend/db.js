const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'compliance_tracker',
    password: 'cse',
    port: 5432,
});

module.exports = pool;