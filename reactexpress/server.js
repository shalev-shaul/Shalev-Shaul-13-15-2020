const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');


// Create connecation
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks'

});

// Connect
db.connect((err) => {
    if(err){
        console.log('Mysql sasd...');
    }
    console.log('Mysql asd...');
});

const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.get('/createdb', (req,res) => {
//     let sql ='CREATE DATABASE Tasks';
//     db.query(sql, (err,result) => {
//         if(err){
//             throw err;
//         }
        
//         res.send('Databa created...');
//     });
// });

app.get('/createtabletasks', (req,res) => {
    let sql ='CREATE TABLE Tasks(id int AUTO_INCREMENT, name VARCHAR(255), text TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP , done BOOLEAN DEFAULT false , PRIMARY KEY (id) )';
    db.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        
        res.send('Table  created...');
    });
});

app.post('/api/updateTask', (req,res) => {
    let user_id = req.body.id;
    let name = req.body.name;
    let text = req.body.text;

    let sql = `UPDATE tasks SET name='${name}' , text='${text}' WHERE id='${user_id}'`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.json(result);
    })
});

app.post('/api/createNewTask', (req,res) => {
    let name = req.body.name;
    let text = req.body.text;

    let sql = `INSERT INTO tasks (name, text) VALUES ('${name}', '${text}') `;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.json(result);
    })
});

app.get('/api/getAllTasks', (req, res) =>{
    let sql = "SELECT * FROM tasks";
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    })

});

app.get('/api/getTaskById', (req, res) =>{
    let user_id = req.query.id;
    let sql = `SELECT * FROM tasks WHERE id=${user_id}`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.json(result);
    })

});

app.get('/api/markAsNotDone', (req, res) =>{
    let user_id = req.query.id;
    let sql = `UPDATE tasks SET done=${false} WHERE id=${user_id}`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.json(result);
    })

});

app.post('/api/deleteTask', (req, res) =>{
    let user_id = req.body.id;
    let sql = `DELETE FROM tasks WHERE id='${user_id}'`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.json(result);
    })

});

app.get('/api/markAsDone', (req, res) =>{
    let user_id = req.query.id;
    let sql = `UPDATE tasks SET done=${true} WHERE id=${user_id}`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.json(result);
    })

});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));