import { useState } from 'react';
import { FiCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  toggleCompleteTask,
  updateTask,
} from '../features/tasks/taskSlice';

// react-modal config
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80%',
    maxWidth: '500px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

function Task({ task }) {
  const [formData, setFormData] = useState({
    _id: task._id,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    isCompleted: task.isCompleted,
  });

  const today = new Date().toJSON().slice(0, 10);

  const dispatch = useDispatch();

  const { title, deadline, description } = formData;

  const [inputType, setInputType] = useState(deadline ? 'date' : 'string');

  // update the state
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Modal props & methods
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setFormData({
      _id: task._id,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      isCompleted: task.isCompleted,
    });
    setIsOpen(true);
  }
  function afterOpenModal() {
    // console.log(task);
    // console.log(formData);
  }
  function closeModal() {
    setFormData({
      _id: task._id,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      isCompleted: task.isCompleted,
    });
    setInputType(task.deadline ? 'date' : 'string');
    setIsOpen(false);
  }

  const onDelete = (task) => {
    dispatch(deleteTask(task));
  };

  const onComplete = (task) => {
    dispatch(toggleCompleteTask(task));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    closeModal();
    dispatch(updateTask(formData));
  };

  return (
    <div className="task">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Edit Task</h2>
        <hr />

        <p className="text-sm mb-3 text-color-gray-300">
          Created on {task.createdAt.slice(0, 10)}
        </p>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task </label>
            <input
              type="string"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="What do you want to do?"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Due date </label>
            <input
              type={inputType}
              className="formControl"
              id="deadline"
              name="deadline"
              value={deadline ? deadline.slice(0, 10) : ''}
              placeholder="Click here to set a deadline."
              onFocus={() => setInputType('date')}
              onBlur={() => !deadline && setInputType('string')}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              rows="4"
              cols="50"
              type="textarea"
              className="formControl"
              id="description"
              name="description"
              value={description}
              placeholder="Add some extra info"
              onChange={onChange}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Save Changes</button>
          </div>
        </form>
      </Modal>

      <div className="task__left">
        <div className="checkTask">
          {task.isCompleted === true ? (
            <FiCheckCircle
              onClick={() => onComplete(task)}
              className="complete__green"
            />
          ) : (
            <FiCircle
              onClick={() => onComplete(task)}
              className="completed__green"
            />
          )}
        </div>
        <span
          onClick={() => openModal(task)}
          className={
            'task__name ' + (task.isCompleted === true ? 'task__completed' : '')
          }
        >
          {task.title}
        </span>
      </div>

      <div className="task__right">
        {/* show the date if there is any deadline */}
        <span
          onClick={() => openModal(task)}
          style={
            task.deadline?.slice(0, 10) <= today
              ? {
                  color:
                    task.isCompleted === true
                      ? 'var(--color-rose-200)'
                      : 'var(--color-rose-700)',
                }
              : null
          }
          className={
            'task__date ' + (task.isCompleted === true ? 'task__completed' : '')
          }
        >
          {task.deadline?.slice(0, 10)}
        </span>

        {/* delete button */}
        <FiXCircle
          onClick={() => onDelete(task)}
          className={
            task.isCompleted === true ? 'complete__red' : 'incomplete__red'
          }
        />
      </div>
    </div>
  );
}

export default Task;
