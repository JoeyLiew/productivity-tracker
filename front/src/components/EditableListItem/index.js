import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditableListItem.css';

const EditableListItem = ({ id, value }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(value);

  const handleChange = (event) => {
    event.preventDefault();
    console.log('Change Item');
    setIsEditing(false);
  };

  return (
    <li onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <form onSubmit={handleChange}>
          <input
            autoFocus
            type='text'
            onBlur={handleChange}
            value={val}
            onChange={(event) => setVal(event.target.value)}
            className='editable-list-item__input'
          />
          <button type='submit' className='editable-list-item__button' />
        </form>
      ) : (
        <span>{value}</span>
      )}
    </li>
  );
};

EditableListItem.propTypes = {
  value: PropTypes.string.isRequired,
};

export default EditableListItem;
