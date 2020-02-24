// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const projects = sequelizeClient.define('projects', {
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
  projects.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    projects.belongsToMany(models.users, { through: 'projects_users' });
    projects.belongsToMany(models.roles, { through: 'project_roles' });
  };

  return projects;
};
