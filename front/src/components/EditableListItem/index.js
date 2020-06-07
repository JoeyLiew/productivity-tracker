import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import './EditableListItem.css';
import { updateTask } from '../../redux/tasks';

const EditableListItem = ({ id, description, completed }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(description);
  const [checked, setChecked] = useState(completed);

  const handleValChange = (event) => {
    event.preventDefault();
    dispatch(updateTask(id, { description: val }));
    setIsEditing(false);
  };

  const handleCheckChange = async (event) => {
    event.stopPropagation();
    setChecked((prevCheck) => {
      console.log('Checked', !prevCheck);
      dispatch(updateTask(id, { completed: !prevCheck }));
      return !prevCheck;
    });
  };

  return (
    <li
      onClick={(event) => {
        event.stopPropagation();
        setIsEditing(true);
      }}
      className='editable-list-item'
    >
      <input type='checkbox' checked={checked} onClick={handleCheckChange} />
      {isEditing ? (
        <form onSubmit={handleValChange}>
          <input
            autoFocus
            type='text'
            onBlur={handleValChange}
            value={val}
            onChange={(event) => setVal(event.target.value)}
            className='editable-list-item__input'
          />
          <button type='submit' className='editable-list-item__button' />
        </form>
      ) : (
        <span>{description}</span>
      )}
    </li>
  );
};

EditableListItem.propTypes = {
  value: PropTypes.string.isRequired,
};

export default EditableListItem;
