var path = require('path');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var passport = require('passport');
var mongodb = 'lista-mercado';
var serverport = 3000;
var cadena_bd = 'mongodb://localhost/'+mongodb;

// Conexiona a la DB
mongoose.connect(cadena_bd, function(err, res) {
if(err){
	//throw err;
	console.error('Error al conectar con la base de datos: '+cadena_bd);
	process.exit(1);
}else{
	console.log('Conectado a la base de datos');
}	
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Passport
app.use(passport.initialize());

// Ruta por defecto
var router = express.Router();
router.get('/', function(req, res) {
	res.send("Hello world!");
});
app.use(router);

require('routes')(app,mongoose,express);
// Start server
app.listen(serverport, function() {
	console.log("Servidor iniciado en http://localhost:"+serverport);
});