import React, { useState } from 'react'; // CAMBIO: Importamos useState

// CAMBIO: Ahora recibe notifications y setNotifications desde el Header
function NotificationsPanel({ isOpen, onClose, notifications, setNotifications }) {
  
  // BORRA el array estático y el useState que pusimos antes aquí adentro.

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  if (!isOpen) return null;
  return (
    <div className="notifications-panel">
      <div className="panel-header">
        <h3>Notificaciones</h3>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>
      <div className="notifications-list">
        {notifications.map(notif => (
          // CAMBIO: Añadimos un estilo en línea (style) para cambiar el color de fondo condicionalmente.
          // Si notif.read es true usa un gris claro (#f4f4f5), si es false usa blanco (#ffffff).
          <div 
            key={notif.id} 
            className="notification-item"
            style={{ 
              backgroundColor: notif.read ? '#f4f4f5' : '#ffffff',
              cursor: 'pointer' // Para simular click
            }}
            onClick={() => toggleReadStatus(notif.id)} // CAMBIO: Al hacer click cambia de estado para probar visualmente
          >
            <div className="notification-icon">📌</div>
            <div className="notification-content">
              {/* CAMBIO (Opcional): El título se ve un poco más delgado si ya fue leído */}
              <p 
                className="notification-title" 
                style={{ fontWeight: notif.read ? '400' : '600' }}
              >
                {notif.title}
              </p>
              {notif.description && <p className="notification-description">{notif.description}</p>}
              <span className="notification-time">{notif.time}</span>
            </div>
            <a href="#" className="notification-link">Ver notificación completa</a>
          </div>
        ))}
      </div>
      <div className="panel-footer">
        <a href="#" className="view-all">Ver todo</a>
      </div>
    </div>
  );
}

export default NotificationsPanel;