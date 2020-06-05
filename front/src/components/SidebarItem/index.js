import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './SidebarItem.css';

const SidebarItem = ({ path, children }) => {
  return (
    <NavLink
      exact
      to={path}
      className='sidebar-item'
      activeClassName='sidebar-item--active'
    >
      {children}
    </NavLink>
  );
};

SidebarItem.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default SidebarItem;
