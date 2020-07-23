class Validator {
  constructor() {
    this.errors = [];
  }

  async validate(data, rules) {
    try {
      await rules.validate(data, { abortEarly: false });
    } catch (error) {
      this.parseErrors([...error.inner, error.errors]);
    }
  }

  parseErrors(error) {
    this.errors = [];
    error.forEach((e) => {
      this.errors.push({ [e.path]: e.errors });
    });
  }

  groupErrors() {
    return Object.values(this.errors).reduce((acc, cv) => {
      const item = Object.keys(cv)[0];
      let obj = {};
      obj =
        acc[item] && !cv[item].includes(acc[item][0])
          ? { [item]: [...acc[item], cv[item][0]] }
          : { [item]: cv[item] };

      acc[item] = obj[item];
      return acc;
    }, {});
  }

  getErrors() {
    return this.groupErrors();
  }

  fails() {
    return this.errors.length > 1;
  }
}

export default new Validator();
