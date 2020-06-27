const express = require("express");
const server = express();

const Sequelize = require('sequelize');
const sequelize = require('../DataBase/bdConexion');

server.get("/",(req,res)=>{
    res.send("Delilah Restó Api");
});

//----------------Usuarios----------------------
server.get("/Usuario",(req,res)=>{
    sequelize.authenticate().then(async()=>{
        const query = 'Select * FROM usuarios';
        const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
        console.log(resultados);
        res.json(resultados);
     });
      
});

server.post("/Usuario/Registrar",(req,res)=>{
    const {
        userNick,
        nombre,
        apellido,
        correo,
        telefono,
        contrasenea,
        tipoUser
      } = req.body;
      
      sequelize.authenticate().then(async()=>{
        let query = `SELECT correo FROM usuarios WHERE correo = ${JSON.stringify(req.body.correo)}`;
        const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
        console.log(resultados);
        if(resultados.length > 0 ){
            res.statusCode = 400;
            res.send('El usuario ya existe en la base de datos');
          } else {
             query = `INSERT INTO usuarios(userNick,nombre,apellido,correo,telefono,contrasenea,tipoUser) VALUES(:userNick,:nombre,:apellido,:correo,:telefono,:contrasenea,:tipoUser)`;

             const insertar = await sequelize.query(query,{replacements:{userNick,
                nombre,
                apellido,
                correo,
                telefono,
                contrasenea,
                tipoUser}});
                res.status(200).json("usuario creado");
          }
     });
});

//----------------Platos------------------------
server.get("/Platos",(req,res)=>{
    sequelize.authenticate().then(async()=>{
        const query = 'Select * FROM platos';
        const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
        console.log(resultados);
        res.json(resultados);
     });
      
});

server.post("/Platos/Crear",(req,res)=>{
    const {
        nombre,
        precio,
        foto
      } = req.body;
      
      sequelize.authenticate().then(async()=>{
        let query = `SELECT nombre FROM platos WHERE nombre = ${JSON.stringify(req.body.nombre)}`;
        const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
        console.log(resultados);
        if(resultados.length > 0 ){
            res.statusCode = 400;
            res.send('El plato ya existe en la base de datos');
          } else {
             query = `INSERT INTO platos(nombre,precio,foto) VALUES(:nombre,:precio,:foto)`;

             const insertar = await sequelize.query(query,{replacements:{
                nombre,
                precio,
                foto}});
                res.status(200).json("Plato creado");
          }
     });
});
//----------------Ordenes-----------------------
module.exports = server;