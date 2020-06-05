import React from 'react';
import PropTypes from 'prop-types';
import './Notebook.css';
import EditableListItem from '../EditableListItem';

const Notebook = ({ tasks }) => {
  return (
    <ul className='list'>
      {tasks.map((task) => (
        <EditableListItem key={task.id} id={task.id} value={task.description} />
      ))}
    </ul>
  );
};

Notebook.propTypes = {
  tasks: PropTypes.array,
};

export default Notebook;
