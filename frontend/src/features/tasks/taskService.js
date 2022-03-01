import axios from 'axios';

const API_URL = 'api/tasks/';

// Create new task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, taskData, config);

  return response.data;
};

// Get all tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  // console.log('DB: ', response.data);

  return response.data;
};

// Delete task
const deleteTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + taskData._id, config);

  return response.data;
};

// Update task
const updateTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + taskData._id, taskData, config);

  return response.data;
};

// Toggle complete
const toggleCompleteTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + taskData._id,
    { isCompleted: !taskData.isCompleted },
    config
  );

  return response.data._id;
};

const taskService = {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  toggleCompleteTask,
};

export default taskService;
