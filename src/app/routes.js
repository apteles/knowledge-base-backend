import { Router } from 'express';

import UsersController from './controllers/UsersController';

const routes = new Router();

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.find);
routes.put('/users/:id', UsersController.update);
routes.post('/users', UsersController.create);

export default routes;
