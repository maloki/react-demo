import * as User from '../controllers/user.js';
import passportService from '../services/passport';
import passport from 'passport';
const requireToken = passport.authenticate('jwt', {session: false});
const requirePassword = passport.authenticate('local', {session: false});
import * as Fact from '../controllers/fact.js'

module.exports = function(app) {
  // AUTH
  app.post('/api/auth/signup', User.signup);
  app.post('/api/auth/signin', User.signin);

  // FACT
  app.post('/api/fact/add', Fact.addFact)
  app.post('/api/fact/delete', Fact.deleteFact)
  app.post('/api/fact/update', Fact.updateFact)
  app.get('/api/fact/getAll/:pageSize/:lastId', Fact.getAllFacts)
  app.get('/api/fact/getAllWithCategories/:pageSize/:lastId', Fact.getAllFactsWithCategories)
  app.get('/api/fact/getAllWithCount/:pageSize/:lastId', Fact.getAllFactsWithCategoryCount)
  app.get('/api/fact/getById/:factId', Fact.getFactById) 
  app.get('/api/fact/getByCategory/:category/:pageSize/:lastId', Fact.getFactsByCategory)
  app.get('/api/fact/getCategories', Fact.getFactsCategories)
  app.get('/api/fact/getCategoriesWithCount', Fact.getFactsCategoriesWithCount)

  // USER
  app.post('/api/user/delete', User.deleteUser)
  app.get('/api/user/getAll', User.getAllUsers)
}
