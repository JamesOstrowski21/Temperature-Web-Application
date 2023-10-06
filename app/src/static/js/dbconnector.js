const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  port: 5432,
  database: 'postgres',
  user: 'root',
  password: 'password',
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }, 
}