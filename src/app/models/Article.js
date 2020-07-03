import { Model, DataTypes, Op } from 'sequelize';
import paginator from 'sequelize-paginate';
import Category from './Category';
import User from './User';

export default class Article extends Model {
  static init(conn) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image_url: DataTypes.STRING,
        content: DataTypes.TEXT,
      },

      {
        scopes: {
          includeUser: {
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
              },
            ],
          },
          includeCategory: {
            include: [
              {
                model: Category,
                as: 'category',
                attributes: ['id', 'name'],
              },
            ],
          },
          in(categories) {
            return {
              where: {
                category_id: {
                  [Op.in]: categories,
                },
              },
            };
          },
        },
        sequelize: conn,
      }
    );

    paginator.paginate(this);
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

// class Project extends Model {}
// Project.init({
//   // Attributes
// }, {
//   defaultScope: {
//     where: {
//       active: true
//     }
//   },
//   scopes: {
//     deleted: {
//       where: {
//         deleted: true
//       }
//     },
//     activeUsers: {
//       include: [
//         { model: User, where: { active: true } }
//       ]
//     },
//     random() {
//       return {
//         where: {
//           someNumber: Math.random()
//         }
//       }
//     },
//     accessLevel(value) {
//       return {
//         where: {
//           accessLevel: {
//             [Op.gte]: value
//           }
//         }
//       }
//     }
//     sequelize,
//     modelName: 'project'
//   }
// });
