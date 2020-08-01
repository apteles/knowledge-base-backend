/* eslint-disable */
const tasks = (arr) => arr.join(' && ');

module.exports = {
  './src/**/*.js': tasks([
    'yarn lint',
    'yarn test',
    'git checkout -- __tests__/database.sqlite',
  ]),
};
