import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './IncidentList.css'

function IncidentList() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Aqui você faria uma chamada à API para buscar os incidentes
    // Simulação de dados
    setIncidents([
      { id: 1, title: 'Incidente 1', status: 'Aberto' },
      { id: 2, title: 'Incidente 2', status: 'Fechado' },
    ]);
  }, []);

  return (
    <div>
      <h2>Lista de Incidentes</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <Link to={`/incident/${incident.id}`}>{incident.title}</Link> - {incident.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;
