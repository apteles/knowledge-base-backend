import { object, string } from 'yup';
import User from '../../models/User';

class UserValidation {
  static createRules() {
    return object().shape({
      name: string().required(),
      status: string().required(),
      password: string().required().min(6),
      email: string()
        .email()
        .required()
        .test(
          'user-exists',
          // eslint-disable-next-line no-template-curly-in-string
          '${path} already exists',
          async function validate(value) {
            try {
              const userExists = await User.count({ where: { email: value } });
              return userExists === 1
                ? this.createError({
                    path: `${this.path}`,
                  })
                : true;
            } catch (error) {
              this.createError({
                path: `${this.path}`,
              });
              return false;
            }
          }
        ),
    });
  }

  static UpdateRules() {
    return object().shape({
      name: string(),
      status: string(),
      password: string().min(6),
      email: string().email(),
    });
  }
}

export default UserValidation;
