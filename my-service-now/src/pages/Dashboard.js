import React from 'react';
import IncidentList from '../components/IncidentList';
import './Dashboard.css'; // Importar o arquivo de estilo específico se necessário

function Dashboard () {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <IncidentList />
    </div>
  );
};

export default Dashboard;
