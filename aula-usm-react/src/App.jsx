import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CourseFilters from './components/CourseFilters';
import CourseGrid from './components/CourseGrid';
import ProfilePage from './components/ProfilePage';
import CalendarPage from './components/CalendarPage'; // NUEVO: Importamos el calendario
import coursesData from './data/courses.json';
import './app.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [showProfile, setShowProfile] = useState(false);
  
  // NUEVO: Estado para alternar entre la vista principal ('home') y el calendario ('calendar')
  const [currentView, setCurrentView] = useState('home');

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

  return (
    <div className="app-container">
      {showProfile && <ProfilePage onClose={() => setShowProfile(false)} />}
      
      <Header 
  onSearch={setSearchTerm}
  onProfileClick={() => setCurrentView(currentView === 'calendar' ? 'home' : 'calendar')} 
  onLogoClick={() => setCurrentView('home')} // ← NUEVA PROP: Fuerza la vista de los ramos
/>
      
      <main className="main-content">
        {/* CONDICIONAL: Si el estado es 'calendar', renderiza la página del calendario */}
        {currentView === 'calendar' ? (
          <CalendarPage />
        ) : (
          /* En caso contrario, renderiza toda la estructura por defecto de tus asignaturas */
          <>
            <section className="welcome-section">
              {/* Extra: Al hacer click en "Bienvenidos", te sirve de atajo por si quieres resetear la vista */}
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
              <CourseGrid 
                courses={filteredAndSortedCourses}
                viewMode={viewMode}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;