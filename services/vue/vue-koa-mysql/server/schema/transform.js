/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transform', {
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
