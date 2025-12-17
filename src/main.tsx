import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';
import PhotoPage from './pages/PhotoPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/photo" element={<PhotoPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
