// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const createdProject = context.result;

    const sequelizeClient = context.app.settings.sequelizeClient;
    const ProjectRole = sequelizeClient.models['project_role'];
    const UserProjectRole = sequelizeClient.models['user_project_role'];
    const projectDto = { ...context.data };
    delete projectDto.project_roles;
    const projectRolesDto = [...context.data.project_roles];

    try {
      const mappedProjectRoles = projectRolesDto.map(projectRole => ({
        order: projectRole.order,
        projectId: createdProject.id,
        roleId: projectRole.role.id
      }));
      const projectRoles = await ProjectRole
        .bulkCreate(mappedProjectRoles);
      const rolesUsersDto = projectRolesDto
        .map(projectRole => projectRole.users.map(user => ({
          order: projectRole.order,
          roleId: projectRole.role.id,
          userId: user.id
        }))).flat();
      await UserProjectRole
        .bulkCreate(rolesUsersDto.map(roleUserDto => ({
          userId: roleUserDto.userId,
          projectRoleId: projectRoles.find(projectRole => {
            return projectRole.roleId === roleUserDto.roleId && projectRole.order === roleUserDto.order;
          }).id
        })));

      // Map the result for DTO
      const project = await context.app.service('project').get(createdProject.id);
      project.project_roles.forEach(project_role => {
        project_role.users.forEach(user => {
          user.password = undefined;
        });
      });

      context.result = project;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
};
