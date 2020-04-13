// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const taskId = context.id;
    const translation = context.data.translation;
    if (translation) {
      try {
        let task = await context.app.service('task').get(taskId);
        await task.createTranslation({ translation });
      } catch (error) { throw new Error(error); }
    }
    return context;
  };
};
