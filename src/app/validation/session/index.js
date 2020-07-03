import { object, string } from 'yup';

class SessionValidation {
  static rules() {
    return object().shape({
      email: string().email().required(),
      password: string().required().min(6),
    });
  }
}

export default SessionValidation;
