// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const query = context.params.query;
    if (query) {
      if (query.roleId) {
        if (query.roleId.$in) {
          query.roleId.$in = query.roleId.$in
            .map(filter => filter === 'null' ? null : filter);
        }
      }
      if (query.userId) {
        if (query.userId.$in) {
          query.userId.$in = query.userId.$in
            .map(filter => filter === 'null' ? null : filter);
        }
      }
    }
    return context;
  };
};
