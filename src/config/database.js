const path = require('path');
require('../bootstrap');
/* eslint-disable no-console */
console.log(process.env.DB_DIALECT);
module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: path.join(__dirname, '..', '..', '__tests__', 'database.sqlite'),
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
