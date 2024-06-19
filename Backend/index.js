const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "tbh",
});

app.post("/send", (req, res) => {
  const qry = "insert into messages values (?,?)";
  connection.query(
    qry,
    [req.body.receiver, req.body.message],
    (error, result) => {
      if (error) {
        res.send("error");
      } else {
        res.send("successful");
      }
    }
  );
});

app.post("/check", (req, res) => {
  const qry = "select * from user where username=?";
  connection.query(qry, [req.body.username], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      if (result.length != 0) {
        res.send("exists");
      } else {
        res.send("not exists");
      }
    }
  });
});

app.post("/registeruser", (req, res) => {
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    const qry = "insert into user values(?,?)";
    connection.query(qry, [req.body.username, hash], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("inserted");
      }
    });
  });
});

app.post("/login", (req, res) => {
  const qry = "select * from user where username=?";
  connection.query(
    qry,
    [req.body.username],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length != 0) {
       
         bcrypt.compare(req.body.password, result[0].password, function(err, result2) {
       
          if(err){
            console.log (err)
          }else if (result2==true){
           const response=jwt.sign({username:result[0].username}, "this is my secret")
           res.json({token:response})
          }  
         
        });
       
        } else {
          res.send("Not found");
        }
      }
    }
  );
});

app.post("/getmessages", (req, res) => {
  var decoded = jwt.verify(req.body.token, 'this is my secret');
 if(decoded.username){
  const qry = "select * from messages where username=?";
  connection.query(qry, [decoded.username], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.json({ messages: result });
    }
  });
 }else{
  res.json({error:"Token not matched"})
 }
  
});

app.listen(3000, (req, res) => {});
