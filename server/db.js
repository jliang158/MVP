require("dotenv").config();
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
})

pool.connect()


pool.query('CREATE TABLE IF NOT EXISTS login (id SERIAL PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res.rows)
    }
})

module.exports = pool;