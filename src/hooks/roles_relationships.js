// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const User = context.app.services.user.Model;
    context.params.sequelize = { raw: false, include: [{ model: User, attributes: ['id', 'nickname'], required: false }] };
    return context;
  };
};
