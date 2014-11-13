var bcrypt = require('bcrypt-nodejs');
exports = module.exports = function(app, mongoose) {

	var usuario = new mongoose.Schema({
	  id        : {type: Number},
	  nombre   : {type: String},
	  nick      : {type: String}, 
	  password  : {type: String},
	  estado  : {type: Number},
	});


	usuario.pre('save', function(callback) {
		var user = this;

		if (!user.isModified('password')) return callback();
			bcrypt.genSalt(5, function(err, salt) {
			if (err) return callback(err);
				bcrypt.hash(user.password, salt, null, function(err, hash) {
				if (err) return callback(err);
					user.password = hash;
					callback();
			});
		});
	});

	usuario.methods.verificarPassword = function(password, cb) {
	  bcrypt.compare(password, this.password, function(err, isMatch) {
	    if (err) return cb(err);
	    cb(null, isMatch);
	  });
	};

	mongoose.model('Usuario',usuario);
};