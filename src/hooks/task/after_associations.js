// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const createdTask = context.result;
    try {
      const translation = context.data.translation;
      if (translation) {
        let task = await context.app.service('task').get(createdTask.id);
        await task.createTranslation({ translation });
      }
      const task = await context.app.service('task').get(createdTask.id);
      task.projectId = undefined;
      context.dispatch = task;

      return context;
    } catch (error) { throw new Error(error); }
  };
};
