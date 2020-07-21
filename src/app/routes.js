import { Router } from 'express';

import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';
import CategoriesController from './controllers/CategoriesController';
import ArticlesController from './controllers/ArticlesController';
import StatisticsController from './controllers/StatisticsController';
import auth from './middlewares/auth';
import isAdmin from './middlewares/isAdmin';

const routes = new Router();
routes.get('/check', function (req, res) {
  return res.json({ message: "Hi I'm alive" });
});

routes.post('/users', UsersController.create);
routes.post('/session', SessionController.create);

routes.use(auth);

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.find);
routes.put('/users/:id', isAdmin(UsersController.update));

routes.get('/categories', CategoriesController.index);
routes.get('/categories/:id', CategoriesController.find);
routes.put('/categories/:id', isAdmin(CategoriesController.update));
routes.post('/categories', isAdmin(CategoriesController.create));

routes.get('/articles', ArticlesController.index);
routes.get('/articles/:id', ArticlesController.find);
routes.put('/articles/:id', isAdmin(ArticlesController.update));
routes.post('/articles', ArticlesController.create);
routes.get('/test', ArticlesController.relations);

routes.get('/stats', StatisticsController.index);

export default routes;
