const mysql = require('mysql');

module.exports = {
    createConnection: function() {
        var conn = mysql.createConnection({
            host: "us-cdbr-iron-east-02.cleardb.net",
            user: "b20769fb990165",
            password: "091c323e",
            database: "heroku_771433dea6b4763"
        });
        return conn;
      }
}