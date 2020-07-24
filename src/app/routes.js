import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerOptions from '../config/swagger';
import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';
import CategoriesController from './controllers/CategoriesController';
import ArticlesController from './controllers/ArticlesController';
import StatisticsController from './controllers/StatisticsController';
import auth from './middlewares/auth';
import isAdmin from './middlewares/isAdmin';

const routes = new Router();
routes.get('/check', (req, res) => {
  return res.json({ message: "Hi I'm alive" });
});

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - users
 *    description: Create a new user.
 *    responses:
 *       '204':
 *          description: Successful Operation
 *
 */
routes.post('/users', UsersController.create);

/**
 * @swagger
 * /session:
 *  post:
 *    tags:
 *      - session
 *    description: Generate a token valid to get access.
 *    responses:
 *       '200':
 *          description: Successful Operation
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/SessionResponse'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Session'
 *      description:
 *      required: true
 */
routes.post('/session', SessionController.create);

routes.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerOptions))
);

routes.use(auth);

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - users
 *    description: Get all users
 *    responses:
 *       '200':
 *          description: Successful Operation
 *    security:
 *        - bearerAuth: []
 *
 */
routes.get('/users', UsersController.index);
/**
 * @swagger
 * /users/:id:
 *  get:
 *    tags:
 *      - users
 *    description: Get a single user
 *    responses:
 *       '200':
 *          description: Successful Operation
 *    security:
 *        - bearerAuth: []
 *
 */
routes.get('/users/:id', UsersController.find);
/**
 * @swagger
 * /users/:id:
 *  put:
 *    tags:
 *      - users
 *    description: Update a user
 *    responses:
 *       '204':
 *          description: Successful Operation
 *    security:
 *        - bearerAuth: []
 *
 */
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
