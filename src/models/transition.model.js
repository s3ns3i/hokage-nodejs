// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const transition = sequelizeClient.define('transition', {
    fromUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fromRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toRoleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fromOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  transition.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    transition.belongsTo(models.task);
  };

  return transition;
};
