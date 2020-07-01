export default class ResourceController {
  constructor(model) {
    this.model = model;
  }

  runValidator() {
    throw Error('runValidator must be implemented');
  }

  transform(obj) {
    return obj;
  }

  transformAll(obj, options = {}) {
    return obj;
  }

  index = async (req, res) => {
    const model = await this.model.findAll({ raw: true });

    res.json(this.transformAll(model, { query: req.query }));
  };

  find = async (req, res) => {
    const model = await this.model.findByPk(req.params.id, { raw: true });
    if (!model) {
      return res.status(400).json({});
    }
    return res.json(this.transform(model));
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

    return res.json(this.transform(model));
  };

  create = async (req, res) => {
    const { validator, EntityValidation } = this.runValidator();

    if (validator) {
      await validator.validate(req.body, EntityValidation.rules());

      if (validator.fails()) {
        return res.status(400).json({ errors: validator.getErrors() });
      }
    }
    const model = await this.model.create(req.body);
    return res.json(this.transform(model));
  };
}
