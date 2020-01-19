const express = require("express");
const mysql = require("mysql");
const PORT = 4000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen("4000", () => {
  console.log("Server started on PORT:" + PORT);
});
//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tododb"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database!");
});

//Get ALL Data
app.get("/list", (req, res) => {
  let sql = "SELECT * FROM todos";
  let query = db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send("Error, could not retrieve data.");
      throw err;
    } else {
      return res.json(results);
    }
  });
});
//add new student
app.post("/add", function(req, res) {
  console.log(req.body);
  let description = req.body.description;
  let responsible = req.body.responsible;
  let priority = req.body.priority;
  let isComplete = req.body.isComplete;

  let sql =
    "INSERT INTO todos (description, responsible, priority, isComplete) VALUES ('" +
    description +
    "','" +
    responsible +
    "','" +
    priority +
    "','" +
    isComplete +
    "')";
  db.query(sql, function(err) {
    if (err) {
      res.status(400).send("Error, insertion failed.");
      throw err;
    }
    console.log("1 record inserted");
  });
});
//delete student by id
app.post("/delete/:id", function(req, res) {
  console.log(req.body);
  let id = req.params.id;
  let sql = `DELETE FROM todos WHERE id = ${id}`;
  db.query(sql, function(err) {
    if (err) {
      res.status(400).send("Error, delete failed.");
      throw err;
    }
    console.log("1 record deleted");
  });
});

app.post(`/edit/:id`, function(req, res) {
  console.log(req.body);
  let id = req.params.id;
  let description = req.body.description;
  let responsible = req.body.responsible;
  let priority = req.body.priority;
  let isComplete = req.body.isComplete;
  let sql = `UPDATE todos SET description = ${description}, responsible = ${responsible}, priority = ${priority}, isComplete = ${isComplete} WHERE id = ${id}`;
  db.query(sql, function(err) {
    if (err) {
      res.status(404).send("Error, Could not update data.");
      throw err;
    }
    console.log("1 record Updated!");
  });
});
