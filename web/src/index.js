const express = require("express"); 
const path = require("path");
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const ServerApp = express(); //server
//Importing routers
const SRVroutes=require('./routers/SRVrouter'); //tengo all routes de product dentro de custRout 

//Settings -> configuraciones de express
ServerApp.set('port', process.env.PORT || 3000); 
ServerApp.set('view engine','ejs'); //procesador de html
ServerApp.set('views', path.join(__dirname,'views')); //ejecuta index.js, y hacia q carpetas

//Middlewares -> fction q se ejecuta antes de peticion usuario
ServerApp.use(morgan('dev')); //peticion a consola
ServerApp.use(myConnection(mysql,{ //prts de comunicacion mysql y config
    host:'localhost',
    user:'root',
    password:'0&privateVoid',
    post:3306, 
    database:'SistemaRentaVehiculos'
},'single'));
ServerApp.use(express.urlencoded({extended:false})); //to formulary

//Routers -> URLs del servidor
ServerApp.use('/',SRVroutes);

ServerApp.listen(ServerApp.get('port'), () =>{  //escucha el puerto 3000
    console.log('Server on Port 3000'); //teminal mensaje
});