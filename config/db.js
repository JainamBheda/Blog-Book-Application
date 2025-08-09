const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Blog', 'root', '3740', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

module.exports = sequelize;
