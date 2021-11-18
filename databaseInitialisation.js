const mysqlConnection = require("./connection");

var databaseInitialisation = () => {
    var sqltext = "CREATE DATABASE IF NOT EXISTS threetest; USE threetest; CREATE TABLE IF NOT EXISTS person (id INT(4) AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(40) NOT NULL, prenom VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, motDePasse VARCHAR(50) NOT NULL); CREATE TABLE IF NOT EXISTS project (id INT(4) AUTO_INCREMENT PRIMARY KEY, titre VARCHAR(50) NOT NULL, description TEXT NOT NULL, dateCreation DATETIME NOT NULL, dateEstimation DATETIME, person INT(4) NOT NULL); CREATE TABLE IF NOT EXISTS task (id INT(4) AUTO_INCREMENT PRIMARY KEY, titre VARCHAR(50) NOT NULL, description TEXT NOT NULL, dateCreation DATETIME NOT NULL, dateEstimation DATETIME, niveau enum('declare', 'encours', 'acheve') NOT NULL DEFAULT 'declare', project INT(4) NOT NULL); CREATE TABLE IF NOT EXISTS team(id INT(4) AUTO_INCREMENT PRIMARY KEY, task INT(4), person INT(4) NOT NULL); ";

    mysqlConnection.query(sqltext, (err, rows, fields) => {
        if(err)
            console.log(err);
        else
            console.log(rows);
    });
}

module.exports = databaseInitialisation;