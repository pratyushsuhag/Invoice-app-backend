const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
        process.exit(1);
    } else {
        console.log('MySQL connected');
    }
});

module.exports = db;

