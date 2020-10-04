// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const createdTask = context.result;
    try {
      // there are only two ways - either translation is saved, or task is passed
      await saveTransitionIfTaskIsPassed(context);
      await saveTranslation(context);

      const task = await context.app.service('task').get(createdTask.id);
      context.result = task;

      return context;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
};

async function saveTransitionIfTaskIsPassed(context) {
  const createdTask = context.result;
  const previousRoleId = context.params.previousRoleId;
  const previousUserId = context.params.previousUserId;
  const previousOrder = context.params.previousOrder;

  if(previousRoleId && previousUserId && previousOrder) {
    await context.app.service('transition').create({
      taskId: createdTask.id,
      fromUserId: previousUserId,
      toUserId: createdTask.userId,
      fromRoleId: previousRoleId,
      toRoleId: createdTask.roleId,
      fromOrder: previousOrder,
      toOrder: createdTask.projectRoleOrder,
    });
  }
}

async function saveTranslation(context) {
  const translation = context.data.translation;
  if(translation) {
    const createdTask = context.result;
    const task = await context.app.service('task').get(createdTask.id);
    const latestTranslation = task.translations[
      task.translations.length - 1
    ];
    if (translation && translation !== latestTranslation) {
      await task.createTranslation({ translation });
    }
  }
}
