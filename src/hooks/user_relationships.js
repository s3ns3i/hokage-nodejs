// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const Role = context.app.services.role.Model;
    const UserProjectRole = context.app.services['user-project-role'].Model;
    const ProjectRole = context.app.services['project-role'].Model;
    const Project = context.app.services.project.Model;

    context.params.sequelize = {
      raw: false, include: [Role, {
        model: UserProjectRole,
        include: {
          model: ProjectRole,
          include: Project
        }
      }]
    };
    return context;
  };
};
