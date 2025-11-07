import React, { useEffect } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Calculator from './components/Calculator.jsx';

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(["/"]);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="app-shell flex items-center justify-center p-4" data-easytag="id1-react/src/App.js">
        <main className="w-full max-w-sm" data-easytag="id2-react/src/App.js">
          <h1 className="text-2xl font-semibold text-slate-800 mb-4" data-easytag="id3-react/src/App.js">Это калькулятор ниже</h1>
          <Calculator />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
