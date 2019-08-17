/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {transformInstance, transformAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<transformInstance, transformAttribute>('transform', {
    id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true
    },
    origin: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    target: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'transform'
  });
};
