// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    try {
      await context.app.service('role').create({name: 'Uploader'});
      return context;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
};
