import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/incidents">Todos</Link></li>
        <li><Link to="/incidents?status=Novo">Em aberto</Link></li>
        <li><Link to="/incidents?status=Em_andamento">Em andamento</Link></li>
        <li><Link to="/incidents?status=Em_espera">Em espera</Link></li>
        <li><Link to="/incidents?status=Finalizado">Finalizados</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;