var mysql = require('mysql2');

var maindb = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'dudwls1234',
    database: 'crud'
});
maindb.connect();

module.exports = maindb;