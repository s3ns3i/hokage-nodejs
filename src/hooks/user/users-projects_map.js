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
  return new Date(b.updatedAt).getMilliseconds() - new Date(a.updatedAt).getMilliseconds();
};

const latestTask = function(user) {
  // get all projects and find the latest updated task in them
  const tasks = [];
  user.user_project_roles.forEach(userProjectRole => {
    const sortedTasks = userProjectRole.project_role.project.tasks.sort(compareDates);
    if(sortedTasks.length) {
      tasks.push(sortedTasks[0]);
    }
  });
  if(tasks.length) {
    return tasks.sort(compareDates).updatedAt;
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
    console.log(context.result.data[0].user_project_roles[0].project_role);
    context.dispatch.data = usersDto;
    context.dispatch.total = usersDto.length;
    return context;
  };
};
