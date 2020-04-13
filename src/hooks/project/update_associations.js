// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const createAssociations = require('./create_associations');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.data.project_roles) {
      return await createAssociations()(context);
    }
    return context;
  };
};
