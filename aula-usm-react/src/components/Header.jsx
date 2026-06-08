import React, { useState } from 'react';
import NotificationsPanel from './NotificationsPanel';
import MessagesPanel from './MessagesPanel';

// Tu asset local de perfil
import fotoPerfil from '../assets/fotoPerfil.jpg';

function Header({ onSearch, onProfileClick, onLogoClick, onDocumentsClick, currentView }) {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  // Estados de las notificaciones
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Vence el lunes, 8 de junio de 2026, 14:00: Tarea 10 - MVP en React',
      description: 'Entrega hasta el lunes 8 de junio de 2026 - 14:00',
      time: 'hace 1 día 8 horas',
      type: 'task',
      read: false
    },
    {
      id: 2,
      title: 'Vence el sábado, 6 de junio de 2026, 00:00: Actividad 4 - Test de bondad y generadores de números aleatorios',
      time: 'hace 2 días 10 horas',
      type: 'task',
      read: true
    },
    {
      id: 3,
      title: 'Tiene tareas con fecha de entrega en 7 días',
      time: 'hace 2 días 20 horas',
      type: 'info',
      read: false
    },
    {
      id: 4,
      title: '(202601)(TEL341) SIMULACIÓN DE REDES|Paralelos:1 contenido nuevo',
      time: 'hace 4 días 2 horas',
      type: 'course',
      read: true
    }
  ]);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'CONSTANZA FLORES',
      lastMessage: 'Tú: Hola! aquí avanzando',
      time: '23/06/26',
      category: 'Privado',
      avatar: '👩',
      unread: true,
      messages: [
        { sender: 'Elias', text: 'Hola, como vas con el MVP?' },
        { sender: 'Tú', text: 'Hola! aquí avanzando' }
      ]
    },
    {
      id: 2,
      name: 'Grupo de Estudio - FIS110',
      lastMessage: 'Catalina: ¿Alguien tiene la guía 4?',
      time: '22/06/26',
      category: 'Grupo',
      avatar: '👥',
      unread: false,
      messages: [
        { sender: 'Catalina', text: '¿Alguien tiene la guía 4?' }
      ]
    }
  ]);

  const unreadChatsCount = chats.filter(c => c.unread).length;
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="university-logo">
              <div 
                className="logo-placeholder" 
                onClick={onLogoClick}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                USM
              </div> 
            </div>

            <nav className="header-links-nav" style={{ display: 'flex', gap: '20px', height: '100%', alignItems: 'center' }}>
              <span 
                onClick={onLogoClick} 
                className={`header-nav-item ${currentView === 'home' || currentView === 'course' ? 'active' : ''}`}
              >
                Página Principal
              </span>
              <span 
                onClick={onDocumentsClick} 
                className={`header-nav-item ${currentView === 'documents' ? 'active' : ''}`}
              >
                Documentos
              </span>
            </nav>
          </div>

          <div className="header-spacer"></div>

          <div className="header-icons">
            <div className="header-search-wrapper">
              <input
                type="text"
                className="header-search-input"
                placeholder="Buscar cursos"
                value={searchValue}
                onChange={handleSearch}
              />
              <button className="icon-button search-icon">🔍</button>
            </div>
            
            {/* Notificaciones */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                className="icon-button notification-icon"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                }}
              >
                🔔
              </button>
              {unreadCount > 0 && <span className="badge-red">{unreadCount}</span>}
            </div>

            {/* Mensajes */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                className="icon-button message-icon"
                onClick={() => {
                  setShowMessages(!showMessages);
                  setShowNotifications(false);
                }}
              >
                💬
              </button>
              {unreadChatsCount > 0 && <span className="badge-red">{unreadChatsCount}</span>}
            </div>

            {/* Calendario */}
            <button 
              className="icon-button calendar-icon"
              onClick={() => {
                onProfileClick(); // Cambia la vista central al calendario en App.jsx
                setShowNotifications(false);
                setShowMessages(false);
              }} 
            >
              📅
            </button>

            {/* Foto de perfil circular (Pura visual estática) */}
            <img 
              src={fotoPerfil} 
              alt="Perfil" 
              className="icon-button header-profile-avatar"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                padding: '0',
                width: '35px', 
                height: '35px'
              }}
            />

          </div>
        </div>
      </header>

      <NotificationsPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
        notifications={notifications}
        setNotifications={setNotifications}
      />
      
      <MessagesPanel 
        isOpen={showMessages} 
        onClose={() => setShowMessages(false)} 
        chats={chats}
        setChats={setChats}
      />
    </>
  );
}

export default Header;