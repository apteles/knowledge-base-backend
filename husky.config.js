/* eslint-disable */
const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    interactive: true,
    'pre-commit': tasks([
      'yarn lint',
      'yarn test',
      'git checkout -- __tests__/database.sqlite',
    ]),
    'pre-push': tasks([
      'yarn lint',
      'yarn test',
      'git checkout -- __tests__/database.sqlite',
    ]),
  },
};
