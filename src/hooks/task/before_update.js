// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const task = await context.app.service('task').get(context.id);
    task.roleId
      ? context.params.previousRoleId = task.roleId
      : context.params.previousRoleId = null;
    task.userId
      ? context.params.previousUserId = task.userId
      : context.params.previousUserId = null;
    return context;
  };
};
