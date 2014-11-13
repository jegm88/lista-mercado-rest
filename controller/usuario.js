//usuario.js
var mongoose, Usuario;

exports = module.exports = function(mongoose) {
	mongoose = mongoose;
	Usuario = mongoose.model('Usuario');
};

//GET - Regresa todos los Usuarios en la BD
exports.listarUsuarios = function(req, res) {
	console.log('GET');
	Usuario.find(function(err, Usuarios) {
 		if(err) return res.status(500).send(err.message);
		console.log('GET /Usuarios')
		res.status(200).jsonp(Usuarios);
	});
};

//GET - Regresa un Usuario de la BD (por id)
exports.consultarUsuario = function(req, res) {
	console.log('GET');
	Usuario.findOne({id : req.params.id}, function(err, Usuario) {
		 if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(Usuario);
	});
};

//POST - Inserta un nuevo Usuario en la BD
exports.guardarUsuario = function(req, res) {
	console.log('POST');
	var l = new Usuario({
		id : req.body.id,
		nombre : req.body.nombre,
		nick : req.body.nick,
		password : req.body.password,
		estado : req.body.estado
	});
	l.save(function(err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(l);
	});
};

//PUT - Actualiza una Usuario previamente guardada en la BD
exports.actualizarUsuario = function(req, res) {
	console.log('PUT');
	Usuario.findOne({id : req.params.id}, function(err, Usuario) {
		
		Usuario.id = req.body.id;
		Usuario.nombre = req.body.nombre;
		Usuario.nick = req.body.nick;
		Usuario.password = req.body.password;
		Usuario.estado = req.body.estado;

		Usuario.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(Usuario);
		});
	});
};

//DELETE - Elimina una Usuario a partir del código
exports.eliminarUsuario = function(req, res) {
	console.log('DELETE');
	Usuario.findOne({id : req.params.id}, function(err, Usuario) {
		Usuario.remove(function(err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(Usuario);
		})
	});
}