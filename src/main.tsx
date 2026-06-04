import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ScheduleProvider } from './context/ScheduleContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScheduleProvider>
        <App />
      </ScheduleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
