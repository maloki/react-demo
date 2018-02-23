"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("../models/user.js");

var _user2 = _interopRequireDefault(_user);

var _passport = require("./passport.js");

var _emailValidator = require("email-validator");

var _emailValidator2 = _interopRequireDefault(_emailValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  signin: function signin(payload) {
    return new Promise(function (resolve, reject) {
      _user2.default.findOne({ email: payload.email }).then(function (u) {
        u.comparePassword(payload.password, function (err, isMatch) {
          if (!err && isMatch) {
            resolve({ token: (0, _passport.tokenForUser)(u) });
          } else {
            reject({ email: 'Invalid email or password.' });
          }
        });
      }).catch(function (err) {
        reject({ email: 'Invalid email or password.' });
      });
    });
  },
  signup: function signup(payload) {
    return new Promise(function (resolve, reject) {
      if (payload.name === "" || payload.email === "" || payload.password === "" || payload.confirmPassword === "") return resolve({ success: false, payload: "Wypełnij wszystkie pola." });
      if (payload.name.length < 2) return resolve({ success: false, payload: "Nazwa użytkownika musi składać się z przynajmniej 2 znaków." });
      if (!_emailValidator2.default.validate(payload.email)) return resolve({ success: false, payload: "Podany adres email jest niepoprawny." });
      _user2.default.findOne({ email: payload.email }).then(function (usr) {
        if (usr !== null) return resolve({ success: false, payload: "Podany adres email jest zajęty." });else {
          if (payload.password !== payload.confirmPassword) return resolve({ success: false, payload: "Podane hasła muszą być takie same." });
          if (payload.password.length < 8) return resolve({ success: false, payload: "Hasło musi składać się z przynajmniej 8 znaków." });
          var dateRegistered = new Date().toISOString();
          var user = new _user2.default({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            dateRegistered: dateRegistered
          });
          user.markModified('object');
          user.save().then(function (u) {
            return resolve({ success: true, payload: u });
          }).catch(function (e) {
            return reject({ success: false, payload: e });
          });
        }
      });
    });
  },
  getAllUsers: function getAllUsers() {
    return new Promise(function (resolve, reject) {
      _user2.default.find({}).then(function (u) {
        return resolve({ success: true, payload: u });
      }).catch(function (e) {
        return reject({ success: false, payload: e });
      });
    });
  },
  deleteUser: function deleteUser(payload) {
    return new Promise(function (resolve, reject) {
      _user2.default.findByIdAndRemove(payload.userId).then(function (u) {
        return resolve({ success: true, payload: u });
      }).catch(function (e) {
        return reject({ success: false, payload: e });
      });
    });
  }
};