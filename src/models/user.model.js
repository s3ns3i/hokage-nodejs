// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
// const createProjectsRolesModel = require('./project_role.model');
// const createUsersProjectsRolesModel = require('./user_project_role.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define('user', {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }


  }, {
    hooks: {
      beforeCount(options) {
        options.raw = false;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  user.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // models.project_role = createProjectsRolesModel(app);
    // models.user_project_role = createUsersProjectsRolesModel(app);
    user.belongsToMany(models.role, { through: 'user_role' });
    user.belongsToMany(models.project_role, { through: 'user_project_role' });
    user.hasMany(models.user_project_role);
  };

  return user;
};
