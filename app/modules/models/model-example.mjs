module.exports = (sequelize, DataTypes) => {
  const ModelName = sequelize.define('ModelName', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'field_name',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    tableName: 'table_name',
    createdAt: false,
    updatedAt: false
  });

  return ModelName;
}