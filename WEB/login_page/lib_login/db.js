var mysql = require('mysql2');
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'dudwls1234',
    database: 'login'
});
db.connect();

module.exports = db;