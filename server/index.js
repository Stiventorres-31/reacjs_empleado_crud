//SE INSTALÓ
//MYSQL
//EXPRESS
//CORS
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleado_crud_react"
});

app.post("/create",(req,res)=>{
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const pais=req.body.pais;
    const cargo=req.body.cargo;
    const anio=req.body.anio;

    db.query('INSERT INTO datos (nombre,edad,pais,cargo,anio) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anio],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});
app.put("/update",(req,res)=>{
    const id = req.body.id
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const pais=req.body.pais;
    const cargo=req.body.cargo;
    const anio=req.body.anio;

    db.query('UPDATE datos SET nombre=?,edad=?,pais=?,cargo=?,anio=? WHERE id=?',[nombre,edad,pais,cargo,anio,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});
app.get("/empleados",(req,res)=>{
    
    db.query('SELECT * FROM DATOS',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    db.query('DELETE FROM DATOS WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})