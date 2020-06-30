const express = require("express");
const server = express();

const Sequelize = require('sequelize');
const sequelize = require('../DataBase/bdConexion');

const jwt = require('jsonwebtoken');

server.get("/",(req,res)=>{
    res.send("Delilah Restó Api");
});
//autenticacion
 const fima = 'estoEsmuySeguro123';

function verficarTokenAdmin(req,res,next){
  try {
    const token = req.headears.authorization.split(' ')[1];
    const descoficado = jwt.verify(token,firma);
    console.log("aaa"+descoficado);
    if (descoficado){
      req.usuario = descoficado;
      next()
    }
  } catch (error) {
    res.json({error: 'error al validar token'});
  }
  
}

//----------------Login----------------------
server.post("/Login",(req,res)=>{
  const {
    userNick,
    contrasenea
  } = req.body;
  sequelize.authenticate().then(async()=>{

      let query = `Select tipoUser FROM usuarios WHERE userNick = ${JSON.stringify(req.body.userNick)} AND contrasenea = ${JSON.stringify(req.body.contrasenea)}`;
      const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
      console.log(resultados);
      if(resultados.length > 0){
        const token = jwt.sign({resultados},fima);
        console.log("token: "+token);
        res.json(token);
      }else{
        res.statusCode = 400;
          res.send("Usuario o contraseña incorrecta.");
      }
      
   });
    
});
//----------------Usuarios----------------------
server.get("/Usuario",verficarTokenAdmin,(req,res)=>{
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
                res.status(201).json("usuario creado");
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
                res.status(201).json("Plato creado");
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
server.patch("/Plato/ModificarPorId",(req,res)=>{
  const{
    idPlato,
    variable,
    valor
  } = req.body;
  sequelize.authenticate().then(async()=>{

    let query = `SELECT idPlato FROM platos WHERE idPlato = ${JSON.stringify(req.body.idPlato)}`;
    const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
    if (resultados.length > 0){
      // variable
      if (!variable){
        res.statusCode = 404;
          res.json({ error: "El proiedad de plato no encontrada"});
      }else if(variable=="nombre"){
        query = ` UPDATE platos SET nombre = :valor where idPlato = :idPlatoQUERY;`;
        const updatePlato_nombre = await sequelize.query(query,{replacements:{
          idPlatoQUERY: idPlato,
          valor
          }});
          res.sendStatus(201);
      }else if(variable=="precio"){
        query = ` UPDATE platos SET precio = :valor where idPlato = :idPlatoQUERY;`;
        const updatePlato_nombre = await sequelize.query(query,{replacements:{
          idPlatoQUERY: idPlato,
          valor
          }});
          res.sendStatus(201);
      }else{
        query = ` UPDATE platos SET foto = :valor where idPlato = :idPlatoQUERY;`;
        const updatePlato_nombre = await sequelize.query(query,{replacements:{
          idPlatoQUERY: idPlato,
          valor
          }});
          res.sendStatus(201);
      }
     
    }else{
      res.statusCode = 404;
          res.json({ error: " plato no encontrado"});
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
server.patch("/Pedido/ModificarPorId",(req,res)=>{
  const{
    idPedido,
    estado
  } = req.body;
  sequelize.authenticate().then(async()=>{

    let query = `SELECT idPedido FROM pedidos WHERE idPedido = ${JSON.stringify(req.body.idPedido)}`;
    const resultados = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
    if (resultados.length > 0){
      query = ` UPDATE pedidos SET estado = :estadoPedido where idPedido = :idPedido;`;
      const updatePedido = await sequelize.query(query,{replacements:{
        estadoPedido : estado,
        idPedido
        }});
        res.sendStatus(200);
    }else{
      res.statusCode = 404;
          res.json({ error: "El pedido no existe"})
    }
  });
 
});
module.exports = server;