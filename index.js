const express = require('express');
const mysql = require('mysql');
const PORT = 4000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen('4000', () => {
    console.log('Server started on PORT:'+PORT)
});
//Create connection
const db = mysql.createConnection({
    host: '',
    user : '',
    password : '',
    database: ''
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to database!')
});

//Get ALL Data
app.get('/', (req, res)=> {
    let sql = 'SELECT * FROM studentdata';
    let query = db.query(sql, (err, results) =>{
        if(err){            
            throw err;
        } else {
            return res.json({
                data : results
            })
        }
        res.send('student data received');
    });
});

//add new student
app.post('/addstudent', function (req, res) {
    console.log(req.body);
    var Fname = req.body.Fname;
    var Mname = req.body.Mname;
    var Lname = req.body.Lname;
    var Age = req.body.Age;
    var Section = req.body.Section;

        let sql = "INSERT INTO studentdata (Fname, Mname, Lname, Age, Section) VALUES ('" + Fname + "','" + Mname + "','" + Lname + "','" + Age + "','" + Section + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
});
});
//delete student by id
app.post('/delete', function (req, res) {
    console.log(req.body);
    var id = req.body.id;
        let sql = `DELETE FROM studentdata WHERE id = ${id}` ;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record deleted");
});
});
