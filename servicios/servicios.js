const express = require("express");
const server = express();

server.get("/",(req,res)=>{
    res.send("Delilah Restó Api");
});

//----------------Usuarios----------------------

//----------------Platos------------------------

//----------------Ordenes-----------------------
module.exports = server;