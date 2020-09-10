// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    try {
      const task = await context.app.service('task').get(context.result.id);
      context.result = task;

      return context;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
};
