// Servidor Deliah Resto ---- Node JS

//  --Imports--
// Express
const express = require("express");
const server = express();
const bp = require("body-parser");
// JWT autenticacion
const jwt = require("jsonwebtoken");
//const signature = require("./jwt");

server.listen("3500",()=>{
    const date = new Date();
	console.log(`Delilah Resto - Server iniciado ${date}`);
});