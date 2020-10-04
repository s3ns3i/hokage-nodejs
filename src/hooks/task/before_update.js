// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    try {
      validateTaskDto(context);
      isTaskBeingPushedMoreThanOneStep(context);
      await isTaskBeingClosed(context);

      const task = await context.app.service('task').get(context.id);
      task.roleId
        ? context.params.previousRoleId = task.roleId
        : context.params.previousRoleId = null;
      task.userId
        ? context.params.previousUserId = task.userId
        : context.params.previousUserId = null;
      context.params.previousOrder = task.projectRoleOrder;
      return context;
    } catch(error) {
      console.error(error);
      throw new Error(error);
    }
  };
};

function validateTaskDto(context) {
  const {roleId, userId, projectRoleOrder, translation } = context.data;
  console.log(roleId);
  console.log(userId);
  console.log(projectRoleOrder);
  console.log(translation);
  if(!(roleId !== undefined && userId !== undefined && projectRoleOrder) && !translation) {
    throw new Error('You didn\'t provide correct data when patching a task');
  }
}

function isTaskBeingPushedMoreThanOneStep(context) {
  const task = context.data;
  const previousOrder = context.params.previousOrder;

  if(task.projectRoleOrder <= previousOrder + 1) {
    throw new Error('You cannot pass a task by more than one step forward!');
  }
}

async function isTaskBeingClosed(context) {
  const task = context.data;
  const previousOrder = context.params.previousOrder;
  console.dir(task);

  if(previousOrder === task.projectRoleOrder) {
    const orders = await context.app.service('project-role').find({
      query: {
        projectId: task.projectId,
        attributes: ['order']
      }
    });
    if(orders.length !== previousOrder) {
      throw new Error('You cannot pass a task without changing an order!');
    }
  }
}
