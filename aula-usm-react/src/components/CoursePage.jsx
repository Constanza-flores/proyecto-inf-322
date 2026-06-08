import React, { useState } from 'react';

function CoursePage({ courseName, courseCode }) {
  // Estado para las pestañas de la barra azul (Curso, Participantes, etc.)
  const [activeMenuTab, setActiveMenuTab] = useState('Curso');
  
  // Estado para las pestañas horizontales internas (Información General, Certámenes, etc.)
  const [activeTab, setActiveTab] = useState('Información General');

  const menuTabs = ['Curso', 'Participantes', 'Calificaciones', 'Competencias'];
  const tabs = ['Información General', 'Certámenes', 'Material', 'Tareas', 'Proyectos'];

  return (
    <div className="course-page-container">

      {/* BARRA AZUL DE NAVEGACIÓN DEL CURSO */}
      <nav className="course-internal-nav">
        {menuTabs.map(item => (
          <span 
            key={item} 
            className={`nav-item ${activeMenuTab === item ? 'active' : ''}`}
            onClick={() => setActiveMenuTab(item)}
          >
            {item}
          </span>
        ))}
      </nav>

      {/* TÍTULO DE LA ASIGNATURA (Movido justo bajo la barra azul) */}
      <h2 className="course-main-title">
        {courseCode || '(202601)(SIGLA)'} {courseName || 'NOMBRE DE LA ASIGNATURA'}|Paralelos:1
      </h2>

      {/* RENDERIZADO CONDICIONAL SEGÚN LA PESTAÑA DE LA BARRA AZUL */}
      {activeMenuTab === 'Curso' ? (
        <>
          {/* MENÚ DE PESTAÑAS HORIZONTALES */}
          <div className="course-tabs-header">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTENIDO DE LAS PESTAÑAS HORIZONTALES */}
          <div className="course-tab-content">
            {activeTab === 'Información General' ? (
              <>
                {/* CUADRO INFORMATIVO PRINCIPAL */}
                <div className="info-scroll-box">
                  <h3>Descripción del curso </h3>
                </div>

                {/* DESCRIPCIÓN DE LA ASIGNATURA */}
                <div className="course-description-box">
                  <p>
                    <strong>¿Qué aprenderé en este curso?</strong> Aprendizajes esperados, competencias a desarrollar, etc.
                  </p>
                </div>

              </>
            ) : (
              <div className="empty-tab-state">
                <p>Contenido de {activeTab} disponible próximamente.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* VISTA PARA PARTICIPANTES, CALIFICACIONES O COMPETENCIAS */
        <div className="course-tab-content" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="empty-tab-state">
            <p>La sección de <strong>{activeMenuTab}</strong> estará disponible próximamente.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePage;