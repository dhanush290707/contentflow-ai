import { useState } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'dashboard'>('landing');

  return (
    <div className="font-sans text-slate-900 bg-slate-50 selection:bg-blue-200">
      {currentPage === 'landing' && <Landing onNavigate={setCurrentPage} />}
      {currentPage === 'auth' && <Auth onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard onLogout={() => setCurrentPage('landing')} />}
    </div>
  );
}

export default App;
