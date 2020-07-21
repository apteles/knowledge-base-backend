import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import routes from './app/routes';
import db from './database';
import statistics from './app/schedules/statistics';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  async bootstrap() {
    await statistics();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Server Internal error' });
    });
  }
  async shutdown() {
    await db.conn.close();
    await db.mongoConnection.disconnect();
  }
}

export default new App();
