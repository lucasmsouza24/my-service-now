import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentView from './pages/IncidentView';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';
import CreateIncident from './pages/CreateIncident';
import ViewIncident from './pages/ViewIncident/ViewIncident';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<IncidentView />} />
            <Route path="/incidents" element={<IncidentView />} />
            <Route path="/incidents/:id" element={<ViewIncident />} />
            <Route path="/new-incident" element={<CreateIncident />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;