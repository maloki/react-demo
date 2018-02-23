'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var schemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};

var schema = new Schema({
    name: String,
    email: String,
    password: String,
    dateRegistered: { type: Date, default: new Date(1970, 1, 1) },
    role: { type: Number, default: 0 }
}, schemaOptions);

var h = function h(pw, cb) {
    _bcryptNodejs2.default.genSalt(10, function (err, salt) {
        if (err) {
            return cb(err);
        }

        _bcryptNodejs2.default.hash(pw, salt, null, function (err, hash) {
            if (err) {
                return cb(err);
            }
            cb(hash);
        });
    });
};
schema.pre('save', function (next) {
    var user = this;
    if (user.password.length > 16) return next();
    _bcryptNodejs2.default.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        _bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function (candidatePassword, callback) {
    _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

var model = _mongoose2.default.model('User', schema);

exports.default = model;