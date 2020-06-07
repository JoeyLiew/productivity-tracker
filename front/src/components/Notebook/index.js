import React from 'react';
import PropTypes from 'prop-types';
import './Notebook.css';
import EditableListItem from '../EditableListItem';

const Notebook = ({ tasks }) => {
  return (
    <ul className='list'>
      {tasks.map((task) => (
        <EditableListItem
          key={task.id}
          id={task.id}
          description={task.description}
          completed={task.completed}
        />
      ))}
    </ul>
  );
};

Notebook.propTypes = {
  tasks: PropTypes.array,
};

export default Notebook;
