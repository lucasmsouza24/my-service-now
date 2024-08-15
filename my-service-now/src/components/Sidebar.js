import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/incidents">Incidentes</Link></li>
        <li><Link to="/requests">Requisições</Link></li>
        <li><Link to="/logout">Sair</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;