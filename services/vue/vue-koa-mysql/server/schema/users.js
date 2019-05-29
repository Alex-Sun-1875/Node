/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false
    },
    user_name: {
      type: DataTypes.CHAR(20),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
