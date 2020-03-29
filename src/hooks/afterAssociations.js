// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const createdUser = context.result;
    const role = context.data.role;
    try {
      const rolesToAssign = await context.app.service('role')
        .find({ query: { id: { $in: role.map(role => role.id) } } });
      let user = await context.app.service('user').get(createdUser.id);
      await user.addRoles(rolesToAssign.data);
      context.dispatch.role = role;

      return context;
    } catch (error) { throw new Error(error); }
  };
};
