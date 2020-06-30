import { Router } from 'express';

import HelloController from './controllers/HelloController';

const routes = new Router();

routes.get('/', HelloController.index);

export default routes;
