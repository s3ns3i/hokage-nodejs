// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const assignedRoles = function(user) {
  return user.roles.map(role => ({
    id: role.id,
    name: role.name
  }));
};

const assignedProjects = function(user) {
  if (user.user_project_roles) {
    return user.user_project_roles.map(
      userProjectRole => userProjectRole.project_role.project.name
    );
  } else {
    return [];
  }
};

const compareDates = function(a, b) {
  return new Date(b).getMilliseconds() - new Date(a).getMilliseconds();
};

const latestTask = function(user) {
  const activityDates = [];
  user.user_project_roles.forEach(userProjectRole => {
    const project = userProjectRole.project_role.project;
    project.tasks.forEach(task => {
      const transition = task.transitions
        .slice().reverse().find(transition =>
          transition.fromUserId === user.id
        );
      if(transition) {
        activityDates.push(transition.createdAt);
      }
    });
  });
  if(activityDates.length) {
    return activityDates.sort(compareDates)[0];
  }
  return null;
};

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const users = context.result.data;
    const usersDto = users.map(user => ({
      id: user.id,
      nickname: user.nickname,
      roles: assignedRoles(user),
      projects: assignedProjects(user),
      latestTask: latestTask(user)
    }));
    context.dispatch.data = usersDto;
    context.dispatch.total = usersDto.length;
    return context;
  };
};
