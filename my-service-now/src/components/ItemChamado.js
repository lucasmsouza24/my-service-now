import React from 'react';
import { Link } from 'react-router-dom';
import './ItemChamado.css'; // Arquivo CSS para estilização

const ItemChamado = ({ id, title, status, priority, number }) => {
  return (
    <li className="item-chamado">
      <Link to={`/incidents/${id}`} className="item-link">
        <div className="item-number">{number}</div>
        <div className="item-title">{title}</div>
        <div className="item-details">
          <span className="status">{status}</span>
          <span className="priority">{priority}</span>
        </div>
      </Link>
    </li>
  );
};

export default ItemChamado;