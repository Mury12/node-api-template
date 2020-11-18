const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function (value) {
        const hash = bcrypt.hashSync(value, 12);
        this.setDataValue('password', hash);
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'role_id'
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'company_id'
    }
  }, {
    tableName: 'user',
    createdAt: false,
    updatedAt: false
  })

  return User;
}
