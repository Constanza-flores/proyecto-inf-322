import React from 'react';

function ProfileMenu({ isOpen, onClose, onProfileClick }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 1, label: 'Accesibilidad', icon: '♿' },
    { id: 2, label: 'Perfil', icon: '👤', action: 'profile' },
    { id: 3, label: 'Calificaciones', icon: '📊' },
    { id: 4, label: 'Calendario', icon: '📅' },
    { id: 5, label: 'Archivos privados', icon: '📁' },
    { id: 6, label: 'Informes', icon: '📋' },
    { id: 7, label: 'Preferencias', icon: '⚙️' },
    { id: 8, label: 'Idioma', icon: '🌐', hasSubmenu: true },
    { id: 9, label: 'Cerrar sesión', icon: '🚪' }
  ];

  const handleItemClick = (item) => {
    if (item.action === 'profile') {
      onProfileClick();
    }
    onClose();
  };

  return (
    <div className="profile-menu" onClick={onClose}>
      <div className="profile-menu-content" onClick={(e) => e.stopPropagation()}>
        {menuItems.map(item => (
          <div 
            key={item.id} 
            className="profile-menu-item"
            onClick={() => handleItemClick(item)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
            {item.hasSubmenu && <span className="menu-arrow">›</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileMenu;
