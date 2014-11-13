//Elemento.js
var mongoose, Elemento;

exports = module.exports = function(mongoose) {
	mongoose = mongoose;
	Elemento = mongoose.model('Elemento');
}

//GET - Regresa todos los Elementos en la BD
exports.listarElementos = function(req, res) {
	console.log('GET');
	Elemento.find(function(err, Elementos) {
 		if(err) return res.status(500).send(err.message);
		console.log('GET /Elementos')
		res.status(200).jsonp(Elementos);
	});
};

//GET - Regresa un Elemento de la BD (por codigo)
exports.consultarElemento = function(req, res) {
	console.log('GET');
	Elemento.findOne({codigo : req.params.codigo}, function(err, Elemento) {
		 if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(Elemento);
	});
};

//POST - Inserta un nuevo Elemento en la BD
exports.guardarElemento = function(req, res) {
	console.log('POST');
	console.log(eval(req.body));
	var e = new Elemento({
		codigo : req.body.codigo,
		nombre : req.body.nombre,
		estrella : req.body.estrella,
		estado : req.body.estado,
		usuario : req.body.usuario
	});
	e.save(function(err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(e);
	});
};

//PUT - Actualiza un Elemento previamente guardado en la BD
exports.actualizarElemento = function(req, res) {
	console.log('PUT');
	Elemento.findOne({codigo : req.params.codigo}, function(err, Elemento) {
		
		Elemento.codigo = req.body.codigo;
		Elemento.nombre = req.body.nombre;
		Elemento.estrella = req.body.estrella;
		Elemento.estado = req.body.estado;
		Elemento.usuario = req.body.usuario;

		Elemento.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(Elemento);
		});
	});
};

//DELETE - Elimina un Elemento a partir del código
exports.eliminarElemento = function(req, res) {
	console.log('DELETE');
	Elemento.findOne({codigo : req.params.codigo}, function(err, Elemento) {
		Elemento.remove(function(err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(Elemento);
		})
	});
}