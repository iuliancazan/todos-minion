import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, reset } from '../features/tasks/taskSlice';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

function AddTask() {
  const { user } = useSelector((state) => state.auth);
  const { tasks, task, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tasks
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: null,
    taskName: '',
    isCompleted: false,
  });

  const { taskName } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      // dispatch(reset());
      // navigate('/tickets');
    }

    // dispatch(reset());
  }, [dispatch, isError, isSuccess, message]);

  // update the state
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // reset the state
  const resetForm = () => {
    setFormData({
      id: null,
      taskName: '',
      completed: false,
    });
  };

  // dispatch createTask on submit
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: uuid(),
      title: taskName,
      isCompleted: false,
    };
    if (taskName) {
      dispatch(createTask(data));
      resetForm();
    }
  };

  return (
    <div className="addTask mb-5">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="string"
            className="form-control"
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={onChange}
            placeholder="What do you want to do?"
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Add Task</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
