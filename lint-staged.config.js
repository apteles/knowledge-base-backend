/* eslint-disable */
module.exports = {
  '*.js': [
    'yarn lint',
    'yarn test --findRelatedTests',
    'git checkout -- __tests__/database.sqlite',
  ],
};
