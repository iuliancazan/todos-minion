import { FiCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleCompleteTask } from '../features/tasks/taskSlice';

function Task({ task }) {
  // const { id, complete, name } = task;
  // console.log(task);

  const dispatch = useDispatch();

  const onDelete = (task) => {
    dispatch(deleteTask(task));
  };

  const onComplete = (task) => {
    dispatch(toggleCompleteTask(task));
  };

  return (
    <div className="task">
      <div className="task__left">
        <div className="checkTask">
          {task.isCompleted === true ? (
            <FiCheckCircle
              onClick={() => onComplete(task)}
              className="task__completed"
            />
          ) : (
            <FiCircle onClick={() => onComplete(task)} />
          )}
        </div>
        <span className={task.isCompleted === true ? 'task__completed' : ''}>
          {task.title}
        </span>
      </div>

      <div className="task__right">
        <FiXCircle
          onClick={() => onDelete(task)}
          className={
            task.isCompleted === true ? 'task__completed' : 'task_right_button'
          }
        />
      </div>
    </div>
  );
}

export default Task;
