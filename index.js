//SERVIDOR
const express = require("express");
const path = require("path");
//variables de entorno
require("dotenv").config();

//conectando DB
const {dbConnected} = require("./database/config.js");
dbConnected();

//app de express
const app = express();

//1. PARSEO DEL BODY
app.use(express.json()); // importante usar el () porque es funcion

//SERVIDOR DE NODE
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/sockets.js");



//Path publico
//Crear una carpeta y dentro de ella un html que responda un mensaje
const publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));

//RUTA DE LA PETICION POST
app.use("/user", require("./routes/auth.js")); 


server.listen( process.env.PORT, (err) => {

    if(err) throw new Error(err);

    console.log("el servidor esta corriendo en puerto:", process.env.PORT);
 });