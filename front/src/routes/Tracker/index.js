import React from 'react';
import { Route } from 'react-router-dom';
import { MdWork, MdDelete } from 'react-icons/md';
import { FaCheckSquare, FaHome } from 'react-icons/fa';
import './Tracker.css';
import SidebarItem from '../../components/SidebarItem';
import Tasks from '../Tasks';

const Tracker = () => {
  return (
    <main className='tracker'>
      <aside className='tracker__sidebar'>
        <SidebarItem path='/tracker'>
          <FaHome />
          <span>Home</span>
        </SidebarItem>
        <SidebarItem path='/tracker/tasks'>
          <MdWork />
          <span>Tasks</span>
        </SidebarItem>
        <SidebarItem path='/tracker/tasks/completed'>
          <FaCheckSquare />
          <span>Completed</span>
        </SidebarItem>
        <SidebarItem path='/tracker/tasks/deleted'>
          <MdDelete />
          <span>Deleted</span>
        </SidebarItem>
      </aside>
      <div className='tracker__main'>
        <Route exact path='/tracker/tasks/:spec?' component={Tasks} />
      </div>
    </main>
  );
};

export default Tracker;
