export default class ResourceController {
  constructor(model) {
    this.model = model;
  }

  runValidator() {
    throw Error('runValidator must be implemented');
  }

  index = async (req, res) => {
    const model = await this.model.findAll();
    res.json(model);
  };

  find = async (req, res) => {
    const model = await this.model.findByPk(req.params.id);
    if (!model) {
      return res.status(400).json({});
    }
    return res.json(model);
  };

  update = async (req, res) => {
    let model = await this.model.findByPk(req.params.id);

    if (!model) {
      return res.status(400).json({ error: 'Data not found' });
    }

    const { validator, EntityValidation } = this.runValidator();

    if (validator) {
      await validator.validate(req.body, EntityValidation.rules());

      if (validator.fails()) {
        return res.status(400).json({ errors: validator.getErrors() });
      }
    }

    await model.update(req.body);

    model = await this.model.findByPk(req.params.id);

    return res.json(model);
  };

  async create(req, res) {
    const { validator, EntityValidation } = this.runValidator();

    if (validator) {
      await validator.validate(req.body, EntityValidation.rules());

      if (validator.fails()) {
        return res.status(400).json({ errors: validator.getErrors() });
      }
    }
    const model = await this.model.create(req.body);
    return res.json(model);
  }
}
