import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'; // Asegúrate de que apunte a tu archivo de estilos activo

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);