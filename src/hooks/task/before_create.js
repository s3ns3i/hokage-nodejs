// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const task = context.data;
    if (!task.projectId) {
      throw new Error('You must assign a project to this task!');
    }

    const project = await context.app.service('project').get(task.projectId);

    task.roleId = project.project_roles[0].roleId;

    if (project.project_roles[0].users.length === 1) {
      const userId = project.project_roles[0].users[0].id;
      // find task and userId to it
      task.userId = userId;
    }
    return context;
  };
};
