import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IncidentView from './pages/IncidentView';
import RequestView from './pages/RequestView';
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents" element={<IncidentView />} />
            <Route path="/incidents/:id" element={<ViewIncident />} />
            <Route path="/new-incident" element={<CreateIncident />} />
            {/* <Route path="/requests" element={<RequestView />} /> */}
            {/* <Route path="/requests/:id" element={<RequestView />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;