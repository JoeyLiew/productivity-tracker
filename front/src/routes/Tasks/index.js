import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Tasks.css';
import Button from '../../components/Button';
import Notebook from '../../components/Notebook';
import { getTasks, createTask } from '../../redux/tasks';

const Tasks = () => {
  const dispatch = useDispatch();
  const { spec } = useParams();
  const tasks = useSelector((state) => state.tasks.items);

  const [description, setDescription] = useState('');

  useEffect(() => {
    if (spec === 'completed') {
      dispatch(getTasks({ completed: true }));
    }
    if (spec === 'deleted') {
      dispatch(getTasks({ deleted: true }));
    }
    if (!spec) {
      dispatch(getTasks());
    }
  }, [spec]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTask({ description }, () => setDescription('')));
  };

  return (
    <div className='tasks'>
      {!spec && (
        <form className='tasks__form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='tasks__input'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button
            type='submit'
            label='Add Task'
            className='task__form-button'
          />
        </form>
      )}
      <Notebook tasks={tasks} />
    </div>
  );
};

export default Tasks;
