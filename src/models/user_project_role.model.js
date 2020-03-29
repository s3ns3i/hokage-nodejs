// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user_project_role = sequelizeClient.define('user_project_role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = false;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  user_project_role.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    user_project_role.belongsTo(models.user);
    user_project_role.belongsTo(models.project_role);
  };

  return user_project_role;
};
