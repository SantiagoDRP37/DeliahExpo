const mysql = require('mysql2');
const fs = require('fs');
const readline = require('readline');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'Druida[153]',
});
connection.query("CREATE DATABASE Deli", function (err, result) {  
    if (err) throw err;  
    console.log("Database created"); 
});
var rl = readline.createInterface({
    input: fs.createReadStream('./CreacionDB2.sql'),
    terminal: false
   });
  rl.on('line', function(chunk){
    connection.query(chunk.toString('ascii'), function(err, sets, fields){
       if(err) console.log(err);
      });
  });
  rl.on('close', function(){
    console.log("Terminada");
    connection.end();
  });
/*
connection.connect(function(err) {  
    if (err) throw err;  
    console.log("Conectado!");  
    connection.query("CREATE DATABASE Deli", function (err, result) {  
    if (err) throw err;  
    console.log("Database creada");  
    connection.close();
    });  
    });  


    */