import { Model, DataTypes } from 'sequelize';
import paginator from 'sequelize-paginate';

export default class Category extends Model {
  static init(conn) {
    super.init(
      {
        name: DataTypes.STRING,
        parent_id: DataTypes.INTEGER,
      },
      { sequelize: conn }
    );
    paginator.paginate(this);
    return this;
  }
}
