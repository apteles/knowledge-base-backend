/* eslint-disable */
const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    interactive: true,
    'pre-commit': tasks(['yarn lint', 'yarn test']),
    'pre-push': tasks(['yarn lint', 'yarn test']),
  },
};
