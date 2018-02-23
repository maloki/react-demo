'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tokenForUser = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../core/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localOptions = {
    usernameField: 'name'
};
var jwtOptions = {
    jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),
    secretOrKey: _config2.default.secret
};
var tokenForUser = exports.tokenForUser = function tokenForUser(user) {
    var timestamp = new Date().getTime();
    return _jwtSimple2.default.encode({
        sub: user.id,
        iat: timestamp
    }, _config2.default.secret);
};
var localLogin = new _passportLocal2.default(localOptions, function (email, password, done) {
    _user2.default.findOne({
        'email': email
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});
var jwtLogin = new _passportJwt.Strategy(jwtOptions, function (payload, done) {
    _user2.default.findById(payload.sub).exec(function (err, user) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

_passport2.default.use(jwtLogin);
_passport2.default.use(localLogin);