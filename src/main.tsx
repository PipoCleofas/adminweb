import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import AdminLogin from './pages/AdminLogin';
import Approval from './pages/Approval';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import History from './pages/HIstory';
import { LanguageProvider } from './context/LanguageProvider';  
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />

        </Routes>
      </Router>
    </LanguageProvider>
  </StrictMode>
);
