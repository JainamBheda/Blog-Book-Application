const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true
});

const Blog = require('./blog');
const User = require('./user');

Comment.belongsTo(Blog, { foreignKey: 'blogId', as: 'blog' });
Comment.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

User.hasMany(Comment, { foreignKey: 'createdBy', as: 'userComments' });
Blog.hasMany(Comment, { foreignKey: 'blogId', as: 'blogComments' });

module.exports = Comment;
