// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const project_role = sequelizeClient.define('project_role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    order: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = false;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  project_role.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    project_role.belongsTo(models.project);
    project_role.belongsTo(models.role);
    project_role.belongsToMany(models.user, { through: 'user_project_role' });
    project_role.hasMany(models.user_project_role);
  };

  return project_role;
};
