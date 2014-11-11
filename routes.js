exports = module.exports = function(app, mongoose, express) {
	// Import Models and controllers
	var lista_model = require('./model/lista')(app, mongoose);
	var elemento_model = require('./model/elemento')(app, mongoose);
	// Controllers
	var lista_ctrl = require('./controller/lista');
	var elemento_ctrl = require('./controller/elemento');
	lista_ctrl(mongoose);
	elemento_ctrl(mongoose);

	// API routes
	var router = express.Router();
	router.route('/listas')
	  .get(lista_ctrl.listarListas)
	  .post(lista_ctrl.guardarLista);

	router.route('/listas/:codigo')
	  .get(lista_ctrl.consultarLista)
	  .put(lista_ctrl.actualizarLista)
	  .delete(lista_ctrl.eliminarLista);

	router.route('/elementos')
	  .get(elemento_ctrl.listarElementos)
	  .post(elemento_ctrl.guardarElemento);

	router.route('/elementos/:codigo')
	  .get(elemento_ctrl.consultarElemento)
	  .put(elemento_ctrl.actualizarElemento)
	  .delete(elemento_ctrl.eliminarElemento);

	app.use('/api', router);
}