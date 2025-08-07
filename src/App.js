import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import HomePage from './pages/HomePage';
import PainPage from './pages/PainPage';
import SleepPage from './pages/SleepPage';
import TubePage from './pages/TubePage';
import ExcretionPage from './pages/ExcretionPage';
import SummaryPage from './pages/SummaryPage';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pain" element={<PainPage />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/tube" element={<TubePage />} />
            <Route path="/excretion" element={<ExcretionPage />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </Router>
      </Container>
    </Box>
  );
}

export default App; 