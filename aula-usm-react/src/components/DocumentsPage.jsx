import React from 'react';

function DocumentsPage() {
  // Datos de prueba actualizados con la ruta (path) de carpetas
  const documentsByCourse = [
    {
      id: 1,
      courseCode: '(202601)(INF322)',
      courseName: 'DISEÑO DE INTERFACES USUARIAS',
      files: [
        { name: 'Programa de la Asignatura 1a26.pdf', size: '1.2 MB', type: 'PDF', path: 'Información General / Documentos Obligatorios' },
        { name: 'Guía de Heurísticas de Nielsen.pdf', size: '840 KB', type: 'PDF', path: 'Material / Unidad 2: Evaluación Heurística' },
        { name: 'Plantilla de Prototipado Wireframes.fig', size: '4.5 MB', type: 'FIG', path: 'Proyectos / Enlaces y Recursos Hito 1' }
      ]
    },
    {
      id: 2,
      courseCode: '(202601)(FIS110)',
      courseName: 'FÍSICA GENERAL I',
      files: [
        { name: 'Guía de Ejercicios 1 - Cinemática.pdf', size: '2.1 MB', type: 'PDF', path: 'Material / Unidad 1: Cinemática de la Partícula / Guías' },
        { name: 'Formulario Oficial Primer Certamen.pdf', size: '450 KB', type: 'PDF', path: 'Certámenes / Evaluaciones Anteriores' }
      ]
    },
    {
      id: 3,
      courseCode: '(202601)(MAT100)',
      courseName: 'CÁLCULO I',
      files: [
        { name: 'Apunte Volúmenes de Revolución.pdf', size: '3.3 MB', type: 'PDF', path: 'Material / Unidad 3: Aplicaciones de la Integral' },
        { name: 'Tablas de Derivadas e Integrales.pdf', size: '620 KB', type: 'PDF', path: 'Material / Recursos Complementarios' },
        { name: 'Solucionario Control 2.zip', size: '12.8 MB', type: 'ZIP', path: 'Tareas / Control 2 / Retroalimentación' }
      ]
    }
  ];

  return (
    <div className="documents-page-container">
      <div className="documents-page-header">
        <h2>Descarga Directa de Documentos</h2>
        <p>Accede y descarga todos los archivos de tus asignaturas en un solo lugar, sin tener que navegar por cada curso.</p>
      </div>

      <div className="documents-courses-grid">
        {documentsByCourse.map(course => (
          <div key={course.id} className="document-course-card">
            <div className="doc-card-header">
              <span className="doc-course-code">{course.courseCode}</span>
              <h3 className="doc-course-name">{course.courseName}</h3>
            </div>

            <div className="doc-files-list">
              {course.files.map((file, idx) => (
                <div key={idx} className="doc-file-item">
                  <div className="file-icon-wrapper">
                    {file.type === 'PDF' ? '📄' : file.type === 'ZIP' ? '📦' : '📎'}
                  </div>
                  
                  <div className="file-details">
                    <a href={`#download-${file.name}`} className="file-name-link" title={file.name}>
                      {file.name}
                    </a>
                    
                    {/* NUEVO: Ubicación de carpetas con letra suavecita */}
                    <span className="file-folder-path" title={`Ubicación: ${file.path}`}>
                      {file.path}
                    </span>

                    <span className="file-meta">
                      <span className="file-type-badge">{file.type}</span> • {file.size}
                    </span>
                  </div>

                  <button className="file-download-btn" title="Descargar archivo">
                    📥
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;