// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Sequelize } = require('sequelize');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.data.project_roles) {
      const sequelizeClient = context.app.settings.sequelizeClient;
      const ProjectRole = sequelizeClient.models['project_role'];
      const UserProjectRole = sequelizeClient.models['user_project_role'];

      try {
        const project = await context.app.service('project').get(context.id);

        let projectRoleIds = await context.app.service('project-role')
          .find({ where: { projectId: project.id } });
        projectRoleIds = projectRoleIds.data
          .map(projectRole => projectRole.id);
        console.log(projectRoleIds);

        const { in: opIn } = Sequelize.Op;
        const removedUPR = await UserProjectRole
          .destroy({ where: { projectRoleId: { [opIn]: projectRoleIds } } });
        console.log(removedUPR);

        const removedPR = await ProjectRole
          .destroy({ where: { projectId: project.id } });
        console.log(removedPR);

        return context;
      } catch (error) { throw new Error(error); }
    }
    return context;
  };
};
