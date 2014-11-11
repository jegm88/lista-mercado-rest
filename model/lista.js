exports = module.exports = function(app, mongoose) {

	var lista = new mongoose.Schema({
		codigo : {type: Number},
	    nombre : {type: String},
		elementos:{
			id: {type: Number},
			estado: {type: Number},
			valor: {type: Number},
			marca: {type: String},
			fecha_compra: {type: Date}
		},
		estado: {type: Number}
	});
	mongoose.model('Lista',lista);
};