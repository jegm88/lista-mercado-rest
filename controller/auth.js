var Usuario;
exports = module.exports = function(mongoose) {
  Usuario = mongoose.model('Usuario');
}

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function(nick, password, callback) {
    Usuario.findOne({ nick: nick }, function (err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      user.verificarPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }
        if (!isMatch) { return callback(null, false); }
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
