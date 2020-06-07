// Action Types
const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
const GET_TASKS_FAILURE = 'GET_TASKS_FAILURE';
const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';
const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
const DELETE_TASKS_REQUEST = 'DELETE_TASKS_REQUEST';
const DELETE_TASKS_SUCCESS = 'DELETE_TASKS_SUCCESS';
const DELETE_TASKS_FAILURE = 'DELETE_TASKS_FAILURE';

const initialState = {
  items: [],
  isFetching: false,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
    case CREATE_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.tasks,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [action.task, ...state.items],
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.map((item) =>
          item.id === action.task.id ? action.task : item
        ),
      };
    case GET_TASKS_FAILURE:
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

// Action Creators
const getTasksRequest = () => ({
  type: GET_TASKS_REQUEST,
});

const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  tasks,
});

const getTasksFailure = (error) => ({
  type: GET_TASKS_FAILURE,
  error,
});

const createTaskRequest = () => ({
  type: CREATE_TASK_REQUEST,
});

const createTaskSuccess = (task) => ({
  type: CREATE_TASK_SUCCESS,
  task,
});

const createTaskFailure = (error) => ({
  type: CREATE_TASK_FAILURE,
  error,
});

const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
});

const updateTaskSuccess = (task) => ({
  type: UPDATE_TASK_SUCCESS,
  task,
});

const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  error,
});

const deleteTasksRequest = () => ({
  type: DELETE_TASKS_REQUEST,
});

const deleteTasksSuccess = (tasksId) => ({
  type: DELETE_TASKS_SUCCESS,
  tasksId,
});

const deleteTasksFailure = (error) => ({
  type: DELETE_TASKS_FAILURE,
  error,
});

export const getTasks = (specs) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('act');
    if (!accessToken) {
      return dispatch(getTasksFailure('No access token found.'));
    }
    dispatch(getTasksRequest());
    const res = await fetch('/api/tasks/get', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(specs),
    });
    const { status, data, error } = await res.json();
    if (res.ok) {
      if (status === 'success') {
        dispatch(getTasksSuccess(data.tasks));
      } else {
        dispatch(getTasksFailure(error));
      }
    } else {
      dispatch(getTasksFailure());
    }
  } catch (error) {
    dispatch(getTasksFailure(error));
  }
};

export const createTask = (formData, clearInput) => async (dispatch) => {
  try {
    dispatch(createTaskRequest());
    const accessToken = localStorage.getItem('act');
    if (!accessToken) {
      return dispatch(createTaskFailure('No access token found.'));
    }
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    const { status, data, error } = await res.json();
    if (res.ok) {
      if (status === 'success') {
        dispatch(createTaskSuccess(data.task));
        clearInput();
      } else {
        console.log('Here1');
        dispatch(createTaskFailure(error));
      }
    } else {
      dispatch(createTaskFailure());
    }
  } catch (error) {
    console.log('Error', error);
    dispatch(createTaskFailure(error));
  }
};

export const updateTask = (taskId, formData) => async (dispatch) => {
  try {
    dispatch(updateTaskRequest());
    const accessToken = localStorage.getItem('act');
    if (!accessToken) {
      return dispatch(createTaskFailure('No access token found.'));
    }
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    const { status, data, error } = await res.json();
    if (res.ok) {
      if (status === 'success') {
        dispatch(updateTaskSuccess(data.task));
        console.log('Updated task: ', data.task);
      } else {
        dispatch(updateTaskFailure(error));
      }
    } else {
      dispatch(updateTaskFailure());
    }
  } catch (error) {
    dispatch(updateTaskFailure(error));
  }
};

export const deleteTasks = (data) => async (dispatch) => {
  try {
    dispatch(deleteTasksRequest());
    const accessToken = localStorage.getItem('act');
    if (!accessToken) {
      return dispatch(deleteTasksFailure('No access token found.'));
    }
    const res = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const { status, error } = await res.json();
    if (res.ok) {
      if (status === 'success') {
        dispatch(deleteTasksSuccess(data.tasksId));
      } else {
        dispatch(deleteTasksFailure(error));
      }
    }
  } catch (error) {
    dispatch(deleteTasksFailure(error));
  }
};
