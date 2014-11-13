exports = module.exports = function(app, mongoose) {

	var elemento = new mongoose.Schema({
		codigo : {type: Number},
	    nombre : {type: String},
		estrella:{type: Boolean},
		estado: {type: Number},
		usuario: {type: Number}
	});
	mongoose.model('Elemento',elemento);
};