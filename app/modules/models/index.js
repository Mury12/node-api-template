
import { readdirSync } from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { config } from '../../config/config.js';
const { basename, join } = path

const { DataTypes } = Sequelize
const base = basename(__filename);

const db = {};
const sequelize = new Sequelize({ ...config.mysql });

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== base) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
