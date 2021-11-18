const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log("connected successfull");
    }
});

module.exports = mysqlConnection;