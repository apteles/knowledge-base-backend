import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default class User extends Model {
  static init(conn) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        status: DataTypes.ENUM('A', 'I'),
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      { sequelize: conn }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
