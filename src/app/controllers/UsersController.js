import ResourceController from './Controller';
import User from '../models/User';
import validator from '../validation/validator';
import UserValidation from '../validation/users';

class UsersController extends ResourceController {
  constructor() {
    super(User);
  }

  runValidator = () => {
    return {
      validator,
      EntityValidation: UserValidation,
    };
  };
}

export default new UsersController();
