const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const databaseInitialisation = require("./databaseInitialisation");

// instance express server
let app = express();

// middleware data parsing
app.use(bodyParser.json());

app.use(cors({
    origin: '*'
 }));

// listen for request
app.listen(8001);

// middleware tsy tapaka hevitra
app.get('/', (req, res) => {
    console.log(" slashe is called");
    databaseInitialisation();
});

/**
 * CRUD TEAM
 */
//  READ
app.get('/team', (req, res) => {
    mysqlConnection.query("SELECT * FROM team", (err, rows, fields) => {
        if(err)
            console.log(err);
        else 
            res.send(rows);
    });
});
// CREATE
app.post('/team/create', (req, res) => {
    /**
     * team
     * person
     */
    let team = req.body;
    mysqlConnection.query("INSERT INTO team (task, person) VALUES ('"+team.task+"', '"+team.person+"')", (err, rows, fields) => {
        if(err)
            console.log(err);
        else{
            res.send("ok");
        }
    });
});
// DELETE
app.get('/team/delete/:id', (req, res) => {
    id = req.params.id;
    mysqlConnection.query("DELETE FROM team WHERE id = "+id, (err, rows, fields) => {
        if(err)
            console.log(err);
        else
            res.send(rows);
    });
});


/**
 * CRUD TASK
 */
//  READ
app.get('/task', (req, res) => {
    mysqlConnection.query("SELECT * FROM task", (err, rows, fields) => {
        if(err)
            console.log(err);
        else 
            res.send(rows);
    });
});
// CREATE
app.post('/task/create', (req, res) => {
    /**
     * titre
     * description
     * estimaion,
     * person
     */
    let task = req.body;
    let dateCreation = (new Date()).toISOString();
    mysqlConnection.query("INSERT INTO task (titre, description, dateCreation, dateEstimation, niveau, project) VALUES ('"+task.titre+"', '"+task.description+"', '"+dateCreation+"', '"+task.dateEstimation+"', '"+task.niveau+"', '"+task.project+"')", (err, rows, fields) => {
        if(err)
            console.log(err);
        else{
            mysqlConnection.query("SELECT * FROM task WHERE id = (SELECT max(id) FROM task)", (err, rows, fields) => {
                if(err)
                    console.log(err);
                else
                    res.send(rows[0]);
            })
        }
    });
});
// UPDATE
app.post('/task/update', (req, res) => {
    let task = req.body;
    mysqlConnection.query("UPDATE task SET titre = '"+task.titre+"', description = '"+task.description+"', dateEstimation = '"+task.dateEstimation+"' WHERE id = "+task.id, (err, rows, fields) => {
        if(err)
            console.log(err);
        else{
            res.send("ok");
        }
    });
});
// DELETE
app.get('/task/delete/:id', (req, res) => {
    id = req.params.id;
    mysqlConnection.query("DELETE FROM task WHERE id = "+id, (err, rows, fields) => {
        if(err)
            console.log(err);
        else
            res.send(rows);
    });
});



/**
 * CRUD PROJECT
 */

//  READ
app.get('/project', (req, res) => {
    mysqlConnection.query("SELECT * FROM project", (err, rows, fields) => {
        if(err)
            console.log(err);
        else 
            res.send(rows);
    });
});

// CREATE
app.post('/project/create', (req, res) => {
    /**
     * titre
     * description
     * estimaion,
     * person
     */
    let project = req.body;
    let dateCreation = (new Date()).toISOString();
    mysqlConnection.query("INSERT INTO project (titre, description, dateCreation, dateEstimation, person) VALUES ('"+project.titre+"', '"+project.description+"', '"+dateCreation+"', '"+project.dateEstimation+"', '"+project.person+"')", (err, rows, fields) => {
        if(err)
            console.log(err);
        else{
            mysqlConnection.query("SELECT * FROM project WHERE dateCreation = '"+dateCreation+"'", (err, rows, fields) => {
                if(err)
                    console.log(err);
                else
                    res.send(rows[0]);
            });
        }
    });
});

// UPDATE
app.post('/project/update', (req, res) => {
    let project = req.body;
    mysqlConnection.query("UPDATE project SET titre = '"+project.titre+"', description = '"+project.description+"', dateEstimation = '"+project.dateEstimation+"' WHERE id = "+project.id, (err, rows, fields) => {
        if(err)
            console.log(err);
        else{
            res.send("ok");
        }
    });
});

// DELETE
app.get('/project/delete/:id', (req, res) => {
    id = req.params.id;
    mysqlConnection.query("DELETE FROM project WHERE id = "+id, (err, rows, fields) => {
        if(err)
            console.log(err);
        else
            res.send(rows);
    });
});


/**
 * CRUD Person
 */

//  READ
app.get('/person', (req, res) => {
    mysqlConnection.query("SELECT * FROM person", (err, rows, fields) => {
        if(err)
            console.log(err);
        else 
            res.send(rows);
    });
});

// CREATE
app.post('/person/create', (req, res) => {
    let user = req.body;
    mysqlConnection.query("INSERT INTO person (nom, prenom, email, motDePasse) VALUES ('"+user.nom+"', '"+user.prenom+"', '"+user.email+"', '"+user.motDePasse+"')", (err, rows, fields) => {
        if(err)
            console.log(err);
        else{
            mysqlConnection.query("SELECT * FROM person WHERE email = '"+user.email+"' AND motDePasse = '"+user.motDePasse+"'", (err, rows, fields) => {
                if(err)
                    console.log(err);
                else
                    res.send(rows[0]);
            });
        }
    });
});

// UPDATE
app.post('/person/update', (req, res) => {
    let person = req.body;
    mysqlConnection.query("UPDATE person SET nom = '"+person.nom+"', prenom = '"+person.prenom+"', email = '"+person.email+"', motDePasse = '"+person.motDePasse+"' WHERE id = "+person.id, (err, rows, fields) => {
        if(err)
            console.log(err);
        else{
            mysqlConnection.query("SELECT * FROM person WHERE email = '"+person.email+"' AND motDePasse = '"+person.motDePasse+"'", (err, rows, fields) => {
                if(err)
                    console.log(err);
                else
                    res.send(rows[0]);
            });
        }
    });
});

// DELETE
app.get('/person/delete/:id', (req, res) => {
    id = req.params.id;
    mysqlConnection.query("DELETE FROM person WHERE id = "+id, (err, rows, fields) => {
        if(err)
            console.log(err);
        else
            res.send(rows);
    });
});