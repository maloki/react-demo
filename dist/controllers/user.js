"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.getAllUsers = exports.signup = exports.signin = exports.createUser = undefined;

var _user = require("../services/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUser = exports.createUser = function createUser(req, res, next) {
  console.log("contr user");
  _user2.default.createUser("", "", "").then(function (response) {
    res.send(response);
  });
};

var signin = exports.signin = function signin(req, res, next) {
  _user2.default.signin(req.body).then(function (response) {
    res.send(response);
  });
};

var signup = exports.signup = function signup(req, res, next) {
  _user2.default.signup(req.body).then(function (response) {
    res.send(response);
  });
};

var getAllUsers = exports.getAllUsers = function getAllUsers(req, res, next) {
  _user2.default.getAllUsers().then(function (response) {
    res.send(response);
  });
};

var deleteUser = exports.deleteUser = function deleteUser(req, res, next) {
  _user2.default.deleteUser(req.body).then(function (response) {
    res.send(response);
  });
};