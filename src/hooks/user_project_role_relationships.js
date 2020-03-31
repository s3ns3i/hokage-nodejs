// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const User = context.app.services.user.Model;
    const ProjectRole = context.app.services['project-role'].Model;
    context.params.sequelize = {
      raw: false, include: [User, ProjectRole]
    };
    return context;
  };
};
