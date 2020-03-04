// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const createdUser = context.result;
    const roles = context.data.roles;
    try {
      const rolesToAssign = await context.app.service('roles')
        .find({ query: { code: { $in: roles.map(role => role.code) } } });
      let user = await context.app.service('users').get(createdUser.id);
      await user.addRoles(rolesToAssign.data);
      context.dispatch.roles = roles;

      return context;
    } catch (error) { throw new Error(error); }
  };
};
