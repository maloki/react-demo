"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFactsCategoriesWithCount = exports.getFactsCategories = exports.getFactsByCategory = exports.getFactById = exports.getAllFactsWithCategories = exports.getAllFactsWithCategoryCount = exports.getAllFacts = exports.updateFact = exports.deleteFact = exports.addFact = undefined;

var _fact = require("../services/fact.js");

var _fact2 = _interopRequireDefault(_fact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addFact = exports.addFact = function addFact(req, res, next) {
  _fact2.default.addFact(req.body).then(function (response) {
    res.send(response);
  });
};

var deleteFact = exports.deleteFact = function deleteFact(req, res, next) {
  _fact2.default.deleteFact(req.body).then(function (response) {
    res.send(response);
  });
};

var updateFact = exports.updateFact = function updateFact(req, res, next) {
  _fact2.default.updateFact(req.body).then(function (response) {
    res.send(response);
  });
};

var getAllFacts = exports.getAllFacts = function getAllFacts(req, res, next) {
  _fact2.default.getAllFacts(req.params).then(function (response) {
    res.send(response);
  });
};

var getAllFactsWithCategoryCount = exports.getAllFactsWithCategoryCount = function getAllFactsWithCategoryCount(req, res, next) {
  _fact2.default.getAllFactsWithCategoryCount(req.params).then(function (response) {
    res.send(response);
  });
};

var getAllFactsWithCategories = exports.getAllFactsWithCategories = function getAllFactsWithCategories(req, res, next) {
  _fact2.default.getAllFactsWithCategories(req.params).then(function (response) {
    res.send(response);
  });
};

var getFactById = exports.getFactById = function getFactById(req, res, next) {
  _fact2.default.getAllFacts(req.params).then(function (response) {
    res.send(response);
  });
};

var getFactsByCategory = exports.getFactsByCategory = function getFactsByCategory(req, res, next) {
  console.log("catego");
  _fact2.default.getFactsByCategory(req.params).then(function (response) {
    res.send(response);
  });
};

var getFactsCategories = exports.getFactsCategories = function getFactsCategories(req, res, next) {
  _fact2.default.getFactsCategories().then(function (response) {
    res.send(response);
  });
};

var getFactsCategoriesWithCount = exports.getFactsCategoriesWithCount = function getFactsCategoriesWithCount(req, res, next) {
  _fact2.default.getFactsCategoriesWithCount().then(function (response) {
    res.send(response);
  });
};