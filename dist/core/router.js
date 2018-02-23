'use strict';

var _user = require('../controllers/user.js');

var User = _interopRequireWildcard(_user);

var _passport = require('../services/passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('passport');

var _passport4 = _interopRequireDefault(_passport3);

var _fact = require('../controllers/fact.js');

var Fact = _interopRequireWildcard(_fact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var requireToken = _passport4.default.authenticate('jwt', { session: false });
var requirePassword = _passport4.default.authenticate('local', { session: false });


module.exports = function (app) {
  // AUTH
  app.post('/api/auth/signup', User.signup);
  app.post('/api/auth/signin', User.signin);

  // FACT
  app.post('/api/fact/add', Fact.addFact);
  app.post('/api/fact/delete', Fact.deleteFact);
  app.post('/api/fact/update', Fact.updateFact);
  app.get('/api/fact/getAll/:pageSize/:lastId', Fact.getAllFacts);
  app.get('/api/fact/getAllWithCategories/:pageSize/:lastId', Fact.getAllFactsWithCategories);
  app.get('/api/fact/getAllWithCount/:pageSize/:lastId', Fact.getAllFactsWithCategoryCount);
  app.get('/api/fact/getById/:factId', Fact.getFactById);
  app.get('/api/fact/getByCategory/:category/:pageSize/:lastId', Fact.getFactsByCategory);
  app.get('/api/fact/getCategories', Fact.getFactsCategories);
  app.get('/api/fact/getCategoriesWithCount', Fact.getFactsCategoriesWithCount);

  // USER
  app.post('/api/user/delete', User.deleteUser);
  app.get('/api/user/getAll', User.getAllUsers);
};