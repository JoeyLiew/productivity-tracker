const database = require('../database');

exports.create = async (data) => {
  try {
    const task = await database('tasks').insert(data, '*');
    return {
      status: 'success',
      data: {
        task: task[0],
      },
    };
  } catch (error) {
    return {
      status: 'failure',
      error,
    };
  }
};

exports.read = async (data) => {
  try {
    console.log('Data', data);
    const tasks = await database('tasks').select().where(data);
    return {
      status: 'success',
      data: {
        tasks,
      },
    };
  } catch (error) {
    return {
      status: 'failure',
      error,
    };
  }
};

exports.update = async (taskId, userId, data) => {
  try {
    const task = await database('tasks')
      .update(data)
      .where({ id: taskId, user_id: userId })
      .returning('*');
    if (task.length === 0) {
      return {
        status: 'failure',
        error: {
          general: 'Cannot update task.',
        },
      };
    }
    return {
      status: 'success',
      data: {
        task: task[0],
      },
    };
  } catch (error) {
    return {
      status: 'failure',
      error,
    };
  }
};

exports.delete = async (tasksId, userId) => {
  try {
    const deletedTask = await database('tasks')
      .delete()
      .where(user_id, userId)
      .whereIn('id', tasksId);
    if (deletedTask === 0) {
      return {
        status: 'failure',
        error: {
          general: 'Cannot delete task.',
        },
      };
    }
    return {
      status: 'success',
      message: 'Task successfully deleted.',
    };
  } catch (error) {
    return {
      status: 'failure',
      error,
    };
  }
};
