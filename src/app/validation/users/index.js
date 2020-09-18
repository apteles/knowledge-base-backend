import { object, string } from 'yup';

class UserValidation {
  static createRules() {
    return object().shape({
      name: string().required(),
      status: string().required(),
      password: string().required().min(6),
      email: string().email().required(),
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
