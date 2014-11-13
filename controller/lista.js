//lista.js
var mongoose, Lista;

exports = module.exports = function(mongoose) {
	mongoose = mongoose;
	Lista = mongoose.model('Lista');
};

//GET - Regresa todas las Listas en la BD
exports.listarListas = function(req, res) {
	console.log('GET');
	Lista.find(function(err, Listas) {
 		if(err) return res.status(500).send(err.message);
		console.log('GET /Listas')
		res.status(200).jsonp(Listas);
	});
};

//GET - Regresa una Lista de la BD (por codigo)
exports.consultarLista = function(req, res) {
	console.log('GET');
	Lista.findOne({codigo : req.params.codigo}, function(err, Lista) {
		 if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(Lista);
	});
};

//POST - Inserta una nueva Lista en la BD
exports.guardarLista = function(req, res) {
	console.log('POST');
	var l = new Lista({
		codigo : req.body.codigo,
		nombre : req.body.nombre,
		elementos : req.body.elementos,
		estado : req.body.estado,
		usuario : req.body.usuario
	});
	l.save(function(err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(l);
	});
};

//PUT - Actualiza una Lista previamente guardada en la BD
exports.actualizarLista = function(req, res) {
	console.log('PUT');
	Lista.findOne({codigo : req.params.codigo}, function(err, Lista) {
		
		Lista.codigo = req.body.codigo;
		Lista.nombre = req.body.nombre;
		Lista.elementos = req.body.elementos;
		Lista.estado = req.body.estado;
		Lista.usuario = req.body.usuario;

		Lista.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(Lista);
		});
	});
};

//DELETE - Elimina una Lista a partir del código
exports.eliminarLista = function(req, res) {
	console.log('DELETE');
	Lista.findOne({codigo : req.params.codigo}, function(err, Lista) {
		Lista.remove(function(err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(Lista);
		})
	});
}