// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.data.project_roles) {
      try {
        const project = await context.app.service('project').get(context.id, { query: { $select: 'id'}});

        let projectRoleIds = await context.app.service('project-role')
          .find({ query: { projectId: project.id } });
        projectRoleIds = projectRoleIds.data
          .map(projectRole => projectRole.id);

        if(projectRoleIds.length) {
          await context.app.service('user-project-role')
            .remove(null, { query: { projectRoleId: { $in: projectRoleIds } } });

          await context.app.service('project-role')
            .remove(null, { query: { projectId: project.id } });
        }
        return context;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    }
    return context;
  };
};
