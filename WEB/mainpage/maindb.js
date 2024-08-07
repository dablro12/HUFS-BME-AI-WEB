var mysql = require('mysql2');

var maindb = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crud'
});
maindb.connect();

module.exports = maindb;
