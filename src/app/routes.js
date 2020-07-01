import { Router } from 'express';

import UsersController from './controllers/UsersController';
import CategoriesController from './controllers/CategoriesController';

const routes = new Router();

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.find);
routes.put('/users/:id', UsersController.update);
routes.post('/users', UsersController.create);

routes.get('/categories', CategoriesController.index);
routes.get('/categories/:id', CategoriesController.find);
routes.put('/categories/:id', CategoriesController.update);
routes.post('/categories', CategoriesController.create);

export default routes;
