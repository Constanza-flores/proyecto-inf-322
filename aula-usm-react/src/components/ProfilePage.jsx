import React from 'react';

function ProfilePage({ onClose }) {
  const userProfile = {
    name: 'CONSTANZA FRANCISCA FLÓREZ',
    role: 'Estudiante',
    email: 'constanza.florez@usm.cl',
    phone: '+56 9 12345678',
    avatar: '👩‍🎓'
  };

  return (
    <div className="profile-page-overlay" onClick={onClose}>
      <div className="profile-page-container" onClick={(e) => e.stopPropagation()}>
        <div className="profile-page-header">
          <h1>Mi Perfil</h1>
          <button className="profile-close" onClick={onClose}>✕</button>
        </div>

        <div className="profile-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">{userProfile.avatar}</div>
            <h2>{userProfile.name}</h2>
            <p className="profile-role">{userProfile.role}</p>
          </div>

          <div className="profile-info-section">
            <div className="profile-info-group">
              <label>Correo Electrónico</label>
              <p>{userProfile.email}</p>
            </div>

            <div className="profile-info-group">
              <label>Teléfono</label>
              <p>{userProfile.phone}</p>
            </div>

            <div className="profile-info-group">
              <label>Carrera</label>
              <p>Ingeniería Civil Telemática</p>
            </div>

            <div className="profile-info-group">
              <label>Código de Estudiante</label>
              <p>2026-01</p>
            </div>
          </div>

          <div className="profile-actions">
            <button className="profile-btn edit-btn">Editar Perfil</button>
            <button className="profile-btn logout-btn" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
