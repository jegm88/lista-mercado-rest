exports = module.exports = function(app, mongoose, express) {
	// Import Models and controllers
	var lista_model = require('./model/lista')(app, mongoose);
	var elemento_model = require('./model/elemento')(app, mongoose);
	var usuario_model = require('./model/usuario')(app, mongoose);
	// Controllers
	var lista_ctrl = require('./controller/lista');
	var elemento_ctrl = require('./controller/elemento');
	var usuario_ctrl = require('./controller/usuario');

	var auth_ctrl = require('./controller/auth');
	
	auth_ctrl(mongoose);
	lista_ctrl(mongoose);
	elemento_ctrl(mongoose);
	usuario_ctrl(mongoose);

	// API routes
	var router = express.Router();
	router.route('/listas')
	  .get(auth_ctrl.isAuthenticated, lista_ctrl.listarListas)
	  .post(auth_ctrl.isAuthenticated, lista_ctrl.guardarLista);

	router.route('/listas/:codigo')
	  .get(auth_ctrl.isAuthenticated, lista_ctrl.consultarLista)
	  .put(auth_ctrl.isAuthenticated, lista_ctrl.actualizarLista)
	  .delete(auth_ctrl.isAuthenticated, lista_ctrl.eliminarLista);

	router.route('/elementos')
	  .get(auth_ctrl.isAuthenticated, elemento_ctrl.listarElementos)
	  .post(auth_ctrl.isAuthenticated, elemento_ctrl.guardarElemento);

	router.route('/elementos/:codigo')
	  .get(auth_ctrl.isAuthenticated, elemento_ctrl.consultarElemento)
	  .put(auth_ctrl.isAuthenticated, elemento_ctrl.actualizarElemento)
	  .delete(auth_ctrl.isAuthenticated, elemento_ctrl.eliminarElemento);

	router.route('/usuarios')
	  .get(auth_ctrl.isAuthenticated, usuario_ctrl.listarUsuarios)
	  .post(usuario_ctrl.guardarUsuario);

	router.route('/usuarios/:id')
	  .get(auth_ctrl.isAuthenticated, usuario_ctrl.consultarUsuario)
	  .put(auth_ctrl.isAuthenticated, usuario_ctrl.actualizarUsuario)
	  .delete(auth_ctrl.isAuthenticated, usuario_ctrl.eliminarUsuario);

	app.use('/api', router);
}