import { object, string } from 'yup';

class UserValidation {
  static rules() {
    return object().shape({
      name: string().required(),
      email: string().email().required(),
      status: string().required(),
      password: string().required().min(6),
    });
  }
}

export default UserValidation;

// name: DataTypes.STRING,
// email: DataTypes.STRING,
// status: DataTypes.ENUM('A', 'I'),
// password: DataTypes.VIRTUAL,
