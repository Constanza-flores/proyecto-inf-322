import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CourseFilters from './components/CourseFilters';
import CourseGrid from './components/CourseGrid';
import coursesData from './data/courses.json';
import './app.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

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
      <Header onSearch={setSearchTerm} />
      <main className="main-content">
        <section className="welcome-section">
          <h1 className="welcome-title">Bienvenidos</h1>
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
      </main>
    </div>
  );
}

export default App;
