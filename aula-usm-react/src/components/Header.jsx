import React, { useState } from 'react';
import NotificationsPanel from './NotificationsPanel';
import MessagesPanel from './MessagesPanel';
import ProfileMenu from './ProfileMenu';

function Header({ onSearch, onProfileClick, onLogoClick }) {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // CAMBIO: Movimos el estado de las notificaciones aquí para que el Header pueda leerlo
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Vence el lunes, 8 de junio de 2026, 14:00: Tarea 10 - MVP en React',
      description: 'Entrega hasta el lunes 8 de junio de 2026 - 14:00',
      time: 'hace 1 día 8 horas',
      type: 'task',
      read: false // No leída
    },
    {
      id: 2,
      title: 'Vence el sábado, 6 de junio de 2026, 00:00: Actividad 4 - Test de bondad y generadores de números aleatorios',
      time: 'hace 2 días 10 horas',
      type: 'task',
      read: true // Leída
    },
    {
      id: 3,
      title: 'Tiene tareas con fecha de entrega en 7 días',
      time: 'hace 2 días 20 horas',
      type: 'info',
      read: false // No leída
    },
    {
      id: 4,
      title: '(202601)(TEL341) SIMULACIÓN DE REDES|Paralelos:1 contenido nuevo',
      time: 'hace 4 días 2 horas',
      type: 'course',
      read: true // Leída
    }
  ]);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'CONSTANZA FLORES',
      lastMessage: 'Tú: Hola! aquí avanzando',
      time: '23/06/26',
      category: 'Privado', // <-- Categoría Privado
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
      category: 'Grupo', // <-- Categoría Grupo
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

  const handleProfileMenuClick = () => {
    setShowProfile(false);
    onProfileClick();
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          
          {/* SECCIÓN DEL LOGO MODIFICADA */}
          <div className="logo-section">
            <div className="university-logo">
              <div 
                className="logo-placeholder" 
                onClick={onLogoClick} // ← AL HACER CLIC: Ejecuta la función para volver al home
                style={{ 
                  cursor: 'pointer',   // ← Muestra la mano interactiva
                  userSelect: 'none'   // Evita que se seleccione el texto "USM" al clickear rápido
                }}
              >
                USM
              </div> 
            </div>
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
            
            {/* Contenedor relativo para posicionar el círculo rojo de forma flotante */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                className="icon-button notification-icon"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                  setShowProfile(false);
                }}
              >
                🔔
              </button>

              {/* Si hay más de 0 notificaciones sin leer, dibuja el círculo rojo */}
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  backgroundColor: '#ef4444', // Rojo intenso
                  color: 'white',
                  borderRadius: '50%',
                  padding: '1px 5px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  lineHeight: '1',
                  pointerEvents: 'none' // Evita que interfiera con el click del botón
                }}>
                  {unreadCount}
                </span>
              )}
            </div>

            {/* Icono de Mensajes */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                className="icon-button message-icon"
                onClick={() => {
                  setShowMessages(!showMessages);
                  setShowNotifications(false);
                  setShowProfile(false);
                }}
              >
                💬
              </button>
              {unreadChatsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '1px 5px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  lineHeight: '1',
                  pointerEvents: 'none'
                }}>
                  {unreadChatsCount}
                </span>
              )}
            </div>

            {/* NUEVO: Icono de Calendario (Ubicado entre Mensajes e Imagen) */}
            {/* Icono de Calendario (Ubicado entre Mensajes e Imagen) */}
<button 
  className="icon-button calendar-icon"
  onClick={onProfileClick} // Usamos la prop de navegación que ya recibe el Header
>
  📅
</button>

            {/* Foto de perfil circular */}
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Perfil" 
              className="icon-button header-profile-avatar"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                padding: '0', /* Quita el padding interno para que la foto ocupe todo el círculo */
                width: '35px', 
                height: '35px'
              }}
            />

          </div>
        </div>
      </header>

      {/* Ahora le pasamos las notificaciones y la función de actualizar como props */}
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
      
      <ProfileMenu 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)}
        onProfileClick={handleProfileMenuClick}
      />
    </>
  );
}

export default Header;