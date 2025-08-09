const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  coverImageURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
});

const User = require('./user');
Blog.belongsTo(User, { foreignKey: "createdBy", as: "created" }); // changed alias to "creator"
User.hasMany(Blog, { foreignKey: 'createdBy', as: 'userBlogs' }); // optional reverse

module.exports = Blog;
