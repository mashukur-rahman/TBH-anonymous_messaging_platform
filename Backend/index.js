const express=require("express")
const bodyParser=require("body-parser")
const mysql=require("mysql2")
const app=express()
const cors=require("cors")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"tbh"
})


app.post("/send", (req,res)=>{
  
   const qry="insert into messages values (?,?)"
   connection.query(qry, [req.body.receiver, req.body.message], (error, result)=>{
    if(error){
        res.send("error")
    }else{
      
        res.send("successful")
    }
   })
})

app.post("/check", (req,res)=>{
    const qry="select * from user where username=?"
    connection.query(qry, [req.body.username], (error, result)=>{
        if(error){
            console.log(error)
        }else{
            if(result.length!=0){
                res.send("exists")
            }else{
                res.send("not exists")
            }
        }
    })
})


app.post("/registeruser", (req, res)=>{
    const qry="insert into user values(?,?)"
    connection.query(qry, [req.body.username, req.body.password], (error, result)=>{
        if(error){
            console.log(error)
        }else{
            res.send("inserted")
        }
    })
})


app.post("/login", (req, res)=>{
    const qry="select * from user where username=? and password=? "
    connection.query(qry, [req.body.username, req.body.password], (error, result)=>{
        if(error){
            console.log(error)
        }else{
            if(result.length!=0){
                res.json({username:result[0].username})
            }else{
                res.send("Not found")
            }
            
        }
    })
})


app.post("/getmessages", (req, res)=>{
    console.log(req.body)
    const qry="select * from messages where username=?"
    connection.query(qry, [req.body.username], (error, result)=>{
        if(error){
            console.log(error)
        }else{
            res.json({messages:result})
        }
    } )
})



app.listen(3000, (req,res)=>{})