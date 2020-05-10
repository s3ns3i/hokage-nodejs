// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const createdTask = context.result;
    try {
      const translation = context.data.translation;
      let task = await context.app.service('task').get(createdTask.id);
      const latestTranslation = task.translations[task.translations.length - 1];
      if (translation && translation !== latestTranslation) {
        await task.createTranslation({ translation });
      }
      task = await context.app.service('task').get(createdTask.id);
      context.result = task;

      return context;
    } catch (error) { throw new Error(error); }
  };
};
