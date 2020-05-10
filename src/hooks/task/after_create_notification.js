// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const sendNotifications = async function(app, task, usersIds, roleId) {
  app.service('project').get(task.projectId)
    .then(project => {
      usersIds.forEach(userId => {
        app.service('user').get(userId)
          .then(user => {
            console.log('sending notifications');
            const role = user.roles.find(role => role.id === roleId);
            console.log(userId);
            app.service('notification').create({
              text: `${role.name}: ${project.name} ${task.chapterNo} - ${task.name}`,
              userId
            });
          }).catch(error => {throw new Error(error);});
      });
    });
};

const getUserData = async function(app, projectId, roleId) {
  try {
    const project = await app.service('project').get(projectId);
    let usersIds = [];
    let usersEmails = [];
    const users = project.project_roles
      .find(projectRole => projectRole.roleId === roleId)
      .users;
    usersIds = usersIds.concat(users.map(user => user.id));
    usersEmails = usersEmails.concat(users.map(user => user.email));

    return {usersIds, usersEmails};
  } catch(error) { throw new Error(error);}
};

const removePreviousUserFromLists = function(
  previousUserId,
  usersIds,
  usersEmails
) {
  const index = usersIds.findIndex(userId => userId === previousUserId);
  usersIds.splice(index, 1);
  usersEmails.splice(index, 1);
};

const addUsersToEmailList = function(context, usersEmails) {
  const onlineUsersEmails = context.app.get('usersEmails');
  let offlineUsersEmails = usersEmails
    .filter(usersEmail => !onlineUsersEmails.includes(usersEmail));

  context.params.usersEmails = offlineUsersEmails;
};

const isRoleChanged = function(task, previousRoleId){
  return previousRoleId !== task.roleId;
};

const isUserChanged = function(task, previousUserId) {
  return previousUserId !== task.userId;
};

const isAssignmentChanged = function(task, previousRoleId, previousUserId) {
  return isRoleChanged(task, previousRoleId) || isUserChanged(task, previousUserId);
};

const sendNotificationToRestOfTeammates = function(context, task, roleId, previousUserId) {
  getUserData(
    context.app,
    task.projectId,
    roleId
  ).then(({ usersIds, usersEmails }) => {
    if(previousUserId && !task.userId){
      removePreviousUserFromLists(previousUserId, usersIds, usersEmails);
    }

    sendNotifications(context.app, task, usersIds, roleId);
    addUsersToEmailList(context, usersEmails);
  }).catch(error => {throw new Error(error);} );
};

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    try {
      const previousRoleId = context.params.previousRoleId;
      const previousUserId = context.params.previousUserId;
      const task = context.result;
      context.params.usersEmails = [];
      let _roleId = task.roleId ? task.roleId : null;
      console.log(`_roleId: ${_roleId}`);

      if(!_roleId) { // It's needed for queries later
        const result = await context.app.service('task').get(task.id);
        _roleId = result.roleId;
      }

      if(task.roleId && previousRoleId === undefined) {
        throw new Error('You must provide previous role\'s ID!');
      }
      if(!isAssignmentChanged(task, previousRoleId, previousUserId)) {
        return context;
      }
      // if user changed from null to id or from id to null, send notifications
      if(task.userId) {
        if(task.userId === context.params.user.id) {
          return context;
        }
        sendNotifications(context.app, task, [task.userId], _roleId);
        const user = await context.app.service('user').get(task.userId);
        addUsersToEmailList(context, [user.email]);

        return context;
      }
      sendNotificationToRestOfTeammates(context, task, _roleId, previousUserId);

      return context;
    } catch(error) { throw new Error(error);}
  };
};
