// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

function sortProjectRolesByOrder(project) {
  if(project.project_roles) {
    project.project_roles = project.project_roles.sort((a, b) => a.order - b.order);
  }
}

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const result = context.result;

    if(result.data) {
      const projects = result.data;
      projects.forEach(project => {
        sortProjectRolesByOrder(project);
      });
    } else {
      const project = result;
      sortProjectRolesByOrder(project);
    }

    return context;
  };
};
