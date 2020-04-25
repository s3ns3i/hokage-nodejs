// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // create notification for specific user
    // check if user is assigned to the task
    // if yes, create notification for him
    const task = context.result;
    if(task.userId) {
      try {
        const user = await context.app.service('user').get(task.userId);
        const role = user.roles.find(role => role.id === task.roleId);
        const project = await context.app.service('project').get(task.projectId);
        context.app.service('notification').create({
          text: `${role.name}: ${project.name} ${task.chapterNo} - ${task.name}`,
          userId: user.id
        });
      } catch(error) { throw new Error(error);}
    } else {
      // create notifications for all user in the project
    }

    return context;
  };
};
