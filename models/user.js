const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileImageURL: {
    type: DataTypes.STRING,
    defaultValue: '/Images/image.png'
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    defaultValue: 'USER'
  }
}, {
  timestamps: true 
});

User.beforeCreate(async (user, options) => {
  console.log("Hashing password for:", user.email);
  const salt = await bcrypt.genSalt(10);
  user.salt = salt;
  user.password = await bcrypt.hash(user.password, salt);
  console.log("Hashed password:", user.password);
});

User.matchPassword = async function(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};

module.exports = User;
