import { Model, DataTypes } from 'sequelize';

export default class Category extends Model {
  static init(conn) {
    super.init(
      {
        name: DataTypes.STRING,
        parent_id: DataTypes.INTEGER,
      },
      { sequelize: conn }
    );

    return this;
  }
}
