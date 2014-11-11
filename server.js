var path = require('path');
var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require('mongoose');

var mongodb = 'lista-mercado';
var serverport = 3000;

// Conexiona a la DB
mongoose.connect('mongodb://localhost/'+mongodb, function(err, res) {
if(err) throw err;
	console.log('Conectado a la base de datos');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

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