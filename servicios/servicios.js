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
server.delete("/Platos/EiminarPorId",(req,res)=>{
  const {
      idPlato,
      nombre,
    } = req.body;
    
    sequelize.authenticate().then(async()=>{
      let query = `SELECT nombre FROM platos WHERE idPlato = ${JSON.stringify(req.body.idPlato)}`;
      const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
      console.log(resultados);
      if(resultados.length > 0 ){
          
          query = "delete from platos WHERE idPlato = :idPlato AND nombre = :nombre";

           const eliminar = await sequelize.query(query,{replacements:{
              idPlato,
              nombre}});
              res.sendStatus(204);
        } else {
          res.statusCode = 400;
          res.send('El plato no existe en la base de datos');
        }
   });
});
//----------------Pedidos-----------------------
server.get("/Pedidos",(req,res)=>{
  sequelize.authenticate().then(async()=>{
      const query = 'Select * FROM pedidos';
      const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
      console.log(resultados);
      res.json(resultados);
   });
    
});

server.post("/Pedido/Crear",(req,res,next)=>{
  const {
      descripcion,
      formaDePago,
      id_usuario,
      idPlato
    } = req.body;
    
    sequelize.authenticate().then(async()=>{
      
      if(!id_usuario){
          res.statusCode = 404;
          res.json({ error: "El usuario no existe"})
        } else {
          try {
            let query = `INSERT INTO pedidos(estado,fecha,descripcion,formaDePago,id_usuario) VALUES(:estado,:fecha,:descripcion,:formaDePago,:id_usuario)`;

            const insertarOden = await sequelize.query(query,{replacements:{
              estado: "nuevo",
              fecha: new Date(),
              descripcion,
              formaDePago,
              id_usuario
            }});

            query = `INSERT INTO pedidos_platos(pedidos_id,plato_id) VALUES(:pedidos_id,:idPlato)`;

            const insertarOdenProducto = await sequelize.query(query,{replacements:{
              
              pedidos_id:insertarOden[0],
              idPlato
            }});

            res.status(201).json("pedido creado");
          } catch (error) {
            res.statusCode = 404;
            res.json({ error: "El pedido no pudo ser creado"});
            next(error);
          }
        }
   });
});

server.delete("/Pedido/EiminarPorId",(req,res)=>{
  const {
      idPedido,
      id_usuario,
    } = req.body;
    
    sequelize.authenticate().then(async()=>{
      let query = `SELECT idPedido FROM pedidos WHERE idPedido = ${JSON.stringify(req.body.idPedido)}`;
      const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
      console.log(resultados);
      if(resultados.length > 0 ){
          
          query = "delete from pedidos WHERE idPedido = :idPedido AND id_usuario = :id_usuario";

           const eliminar = await sequelize.query(query,{replacements:{
              idPedido,
              id_usuario}});
              res.sendStatus(204);
        } else {
          res.statusCode = 400;
          res.send('la orden no existe en la base de datos');
        }
   });
});
module.exports = server;