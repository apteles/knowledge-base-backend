import User from '../models/User';
import validator from '../validation/validator';
import UserValidation from '../validation/users';

class UsersController {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  }

  async find(req, res) {
    try {
      const users = await User.findOne(req.params.id);
      res.json(users);
    } catch (error) {}

    return res.status(400).json({});
  }

  update(req, res) {}

  async create(req, res) {
    await validator.validate(req.body, UserValidation.rules());

    if (validator.fails()) {
      return res.status(400).json({ errors: validator.getErrors() });
    }
    const user = await User.create(req.body);
    return res.json(user);
  }
}

export default new UsersController();
