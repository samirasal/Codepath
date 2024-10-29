
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <button>Toggle Status Chart</button>
        </li>
        <li>
          <button>Toggle Species Chart</button>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
