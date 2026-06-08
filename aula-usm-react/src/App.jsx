import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CourseFilters from './components/CourseFilters';
import CourseGrid from './components/CourseGrid';
import ProfilePage from './components/ProfilePage';
import CalendarPage from './components/CalendarPage'; 
import CoursePage from './components/CoursePage'; // Importación de la página del curso
import DocumentsPage from './components/DocumentsPage';
import coursesData from './data/courses.json';

import './app.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [showProfile, setShowProfile] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // Vista activa: 'home', 'calendar' o 'course'
  const [selectedCourse, setSelectedCourse] = useState(null); // Almacena el curso clickeado

  // Extraer departamentos y semestres únicos
  const departments = [...new Set(coursesData.courses.map(c => c.department))].sort();
  const semesters = [...new Set(coursesData.courses.map(c => c.semester))].sort();

  // Filtrar y ordenar cursos
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData.courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === '' || course.department === selectedDepartment;
      const matchesSemester = selectedSemester === '' || course.semester === selectedSemester;
      
      return matchesSearch && matchesDepartment && matchesSemester;
    });

    // Ordenar
    if (sortBy === 'code') {
      filtered.sort((a, b) => a.courseCode.localeCompare(b.courseCode));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchTerm, selectedDepartment, selectedSemester, sortBy]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'department') {
      setSelectedDepartment(value);
    } else if (filterType === 'semester') {
      setSelectedSemester(value);
    }
  };

  // Manejador para abrir un curso específico desde la grilla
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentView('course');
  };

  return (
    <div className="app-container">
      {showProfile && <ProfilePage onClose={() => setShowProfile(false)} />}
      
     <Header 
  onSearch={setSearchTerm}
  onProfileClick={() => setCurrentView(currentView === 'calendar' ? 'home' : 'calendar')} 
  onLogoClick={() => setCurrentView('home')} 
  onDocumentsClick={() => setCurrentView('documents')}
  currentView={currentView} // ← NUEVA PROP: Le avisa al Header la vista actual
/>
      
      <main className="main-content">
        {/* CASO 1: Calendario */}
        {currentView === 'calendar' && <CalendarPage />}

        {/* CASO 2: Detalle del Curso */}
        {currentView === 'course' && (
          <CoursePage 
            courseName={selectedCourse?.name}
            courseCode={selectedCourse?.courseCode}
          />
        )}

        {/* NUEVO CASO 3: Pestaña Nueva de Documentos */}
        {currentView === 'documents' && (
  <DocumentsPage />
)}

        {/* CASO 4: Home (Mis Cursos) */}
        {currentView === 'home' && (
          <>
            <section className="welcome-section">
              <h1 className="welcome-title" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
                Bienvenidos
              </h1>
            </section>

            <section className="courses-section">
              <h2 className="courses-title">Mis cursos</h2>
              <CourseFilters 
                onFilterChange={handleFilterChange}
                onSortChange={setSortBy}
                onViewChange={setViewMode}
                currentSort={sortBy}
                currentView={viewMode}
                departments={departments}
                semesters={semesters}
              />
              <div 
                onClick={() => handleSelectCourse({ name: 'DISEÑO DE INTERFACES USUARIAS', courseCode: '(202601)(INF322)' })}
                style={{ cursor: 'pointer' }}
              >
                <CourseGrid 
                  courses={filteredAndSortedCourses}
                  viewMode={viewMode}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;