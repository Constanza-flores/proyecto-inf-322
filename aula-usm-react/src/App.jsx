import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CourseFilters from './components/CourseFilters';
import CourseGrid from './components/CourseGrid';
import './app.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  const coursesData = [
    {
      id: 1,
      code: '202601',
      courseCode: 'TEL360',
      name: 'PENSAMIENTO DE DISEÑO EN INGENIERÍA',
      category: 'ELECTRONICA',
      parallel: 'Paralelos:1',
      image: 'electronics',
      department: 'ELECTRONICA',
      semester: '2026-01'
    },
    {
      id: 2,
      code: '202601',
      courseCode: 'TEL341',
      name: 'SIMULACIÓN DE REDES',
      category: 'ELECTRONICA',
      parallel: 'Paralelos:1',
      image: 'electronics',
      department: 'ELECTRONICA',
      semester: '2026-01'
    },
    {
      id: 3,
      code: '202601',
      courseCode: 'TEL312',
      name: 'SEGURIDAD EN REDES DE COMPUTADORES',
      category: 'ELECTRONICA',
      parallel: 'Paralelos:1',
      image: 'electronics',
      department: 'ELECTRONICA',
      semester: '2026-01'
    },
    {
      id: 4,
      code: '202601',
      courseCode: 'TEL241',
      name: 'LABORATORIO DE REDES DE COMPUTADORES',
      category: 'ELECTRONICA',
      parallel: 'Paralelos:1',
      image: 'electronics',
      department: 'ELECTRONICA',
      semester: '2026-01'
    },
    {
      id: 5,
      code: '202601',
      courseCode: 'TEL236',
      name: 'REDES DE ACCESO Y COMUNICACIONES ÓPTICAS',
      category: 'ELECTRONICA',
      parallel: 'Paralelos:1',
      image: 'electronics',
      department: 'ELECTRONICA',
      semester: '2026-01'
    },
    {
      id: 6,
      code: '202601',
      courseCode: 'INF322',
      name: 'DISEÑO DE INTERFACES USUARIAS',
      category: 'INFORMATICA',
      parallel: 'Paralelos:1',
      image: 'informatics',
      department: 'INFORMATICA',
      semester: '2026-01'
    }
  ];

  // Extraer departamentos y semestres únicos
  const departments = [...new Set(coursesData.map(c => c.department))];
  const semesters = [...new Set(coursesData.map(c => c.semester))];

  // Filtrar y ordenar cursos
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData.filter(course => {
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
