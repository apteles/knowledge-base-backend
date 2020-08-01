/* eslint-disable */
const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    //  'pre-push': tasks([
    //    'yarn lint',
    //    'yarn test',
    //    'git checkout -- __tests__/database.sqlite',
    //  ]),
  },
};

// tasks([
//   'yarn lint',
//   'yarn test',
//   'git checkout -- __tests__/database.sqlite',
// ])
