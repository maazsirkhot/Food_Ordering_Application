var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'grubhub',
    debug: false,
    multipleStatements: true
});
var sql = "SELECT * FROM USERS";

module.exports = pool;