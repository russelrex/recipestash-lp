import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
