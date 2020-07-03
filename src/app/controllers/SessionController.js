import jwt from 'jsonwebtoken';
import User from '../models/User';
import validator from '../validation/validator';
import SessionValidation from '../validation/session';

class SessionController {
  async create(req, res) {
    await validator.validate(req.body, SessionValidation.rules());

    if (validator.fails()) {
      return res.status(400).json({ errors: validator.getErrors() });
    }

    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) return res.status(401).json({ error: 'User not found' });

    const isValid = await user.checkPassword(req.body.password);
    if (!isValid) return res.status(401).json('Invalid credentials');

    const { id, name, email } = user;
    return res.json({
      id,
      name,
      email,
      token: jwt.sign(
        {
          expiresIn: process.env.EXPIRES_TOKEN,
          subject: email,
          issuer: 'knownledge-api',
        },
        process.env.APP_SECRET
      ),
    });
  }
}

export default new SessionController();
