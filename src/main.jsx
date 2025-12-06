import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import layout from './main.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className={layout.appShell}>
      <App />
    </div>
  </React.StrictMode>
);
