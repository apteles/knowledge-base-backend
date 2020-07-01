import Sequelize from 'sequelize';
import config from '../config/database';
import User from '../app/models/User';
import Category from '../app/models/Category';

const models = [User, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.model)
      );
  }
}

export default new Database();
