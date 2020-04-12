// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const createdUser = context.result;
    const roles = context.data.roles;
    try {
      const rolesToAssign = await context.app.service('role')
        .find({ query: { id: { $in: roles.map(role => role.id) } } });
      let user = await context.app.service('user').get(createdUser.id);
      await user.addRoles(rolesToAssign.data);
      console.log(context.dispatch);
      context.dispatch.roles = roles;

      return context;
    } catch (error) { throw new Error(error); }
  };
};
