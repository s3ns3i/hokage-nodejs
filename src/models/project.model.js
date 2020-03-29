// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const createProjectsRolesModel = require('./project_role.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const project = sequelizeClient.define('project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    volumesNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    suspended: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  project.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // project.belongsToMany(models.role, { through: 'project_role' });
    project.belongsToMany(models.role, { through: 'project_role' });
    project.hasMany(models.project_role);
  };

  return project;
};
