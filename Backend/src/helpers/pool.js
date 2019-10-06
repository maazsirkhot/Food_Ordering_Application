var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'grubhubdb.ciea7s8xmtar.us-west-1.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'grubhub',
    debug: false,
    multipleStatements: true
});
var sql = "SELECT * FROM USERS";

module.exports = pool;