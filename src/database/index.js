import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import config from '../config/database';
import User from '../app/models/User';
import Category from '../app/models/Category';
import Article from '../app/models/Article';

const models = [User, Category, Article];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(config);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  async mongo() {
    try {
      this.mongoConnection = await mongoose.connect(process.env.MONGO_DSN, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      });
    } catch (error) {}
  }

  get conn() {
    return this.connection;
  }
}

export default new Database();
