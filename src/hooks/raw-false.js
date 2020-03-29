// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (!context.params.sequelize) context.params.sequelize = {};
    Object.assign(context.params.sequelize, { raw: false });
    return context;
  };
};
