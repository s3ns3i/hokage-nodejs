// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const tasks = sequelizeClient.define('tasks', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chapterNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    translation: {
      type: DataTypes.TEXT,
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
  tasks.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return tasks;
};
