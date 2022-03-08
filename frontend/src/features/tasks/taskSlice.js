import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

// const dummyTasks = [
//   { _id: '2', title: 'Wash the dishes', isCompleted: false },
//   { _id: '1', title: 'Walk the dog', isCompleted: false },
//   { _id: '3', title: 'Groom the cat', isCompleted: true },
//   { _id: '4', title: 'Pay the bills', isCompleted: false },
//   { _id: '5', title: 'Throw out the garbage', isCompleted: true },
//   { _id: '6', title: 'Cook dinner', isCompleted: true },
// ];

const initialState = {
  tasks: [],
  task: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new task
export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    // return taskData;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get tasks
export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async (_, thunkAPI) => {
    // return taskData;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTasks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Deletetask
export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await taskService.deleteTask(taskData, token);
      console.log('response after delete', res);
      if (res.success === true) return taskData._id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  'tasks/update',
  async (taskData, thunkAPI) => {
    try {
      // console.log(taskData);
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.updateTask(taskData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
    // return id;
  }
);

// Toggle complete status of a task
export const toggleCompleteTask = createAsyncThunk(
  'tasks/toggleComplete',
  async (taskData, thunkAPI) => {
    try {
      // console.log(taskData);
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.toggleCompleteTask(taskData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
    // return id;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // create a new task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // get all tasks
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // delete a task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.tasks.splice(state.tasks.findIndex((task) => task.id === action.payload), 1);
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        toast.error('Task deleted', {
          autoClose: 1000,
          hideProgressBar: true,
        });
      })
      // edit task
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log('reducer payload', action.payload);
        const pos = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        console.log(pos);
        state.tasks[pos] = { ...action.payload };
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleCompleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleCompleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const pos = state.tasks.findIndex(
          (task) => task._id === action.payload
        );
        state.tasks[pos].isCompleted = !state.tasks[pos].isCompleted;
        if (state.tasks[pos].isCompleted) {
          toast.success(`Completed "${state.tasks[pos].title}"`, {
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(toggleCompleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;
