import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../features/tasks/taskSlice';
import AddTask from '../components/AddTask';
import Task from '../components/Task';
import Spinner from '../components/Spinner';

function Tasks() {
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Spinner />}
      <section className="heading">
        <p>Hi! I am here to take notes for you.</p>
      </section>

      <AddTask />

      <div className="tasks">
        <div className="tasks__container">
          {/* Incomplete tasks */}
          {tasks?.some((t) => t.isCompleted === false) ? (
            tasks?.map((t) => !t.isCompleted && <Task task={t} key={t._id} />)
          ) : (
            <p>No due tasks. </p>
          )}

          <hr />

          {/* Completed tasks */}
          {tasks.some((t) => t.isCompleted === true) ? (
            tasks.map((t) => t.isCompleted && <Task task={t} key={t._id} />)
          ) : (
            <p>No completed tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
