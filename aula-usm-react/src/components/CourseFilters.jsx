import React from 'react';

function CourseFilters({ 
  onFilterChange, 
  onSortChange, 
  onViewChange, 
  currentSort, 
  currentView,
  departments,
  semesters
}) {
  return (
    <div className="filters-container">
      <div className="filters-wrapper">
        {/* Departamento */}
        <div className="filter-group">
          <label htmlFor="department-select">Departamento</label>
          <select 
            id="department-select"
            className="filter-select"
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            <option value="">Todos</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Semestre */}
        <div className="filter-group">
          <label htmlFor="semester-select">Semestre</label>
          <select 
            id="semester-select"
            className="filter-select"
            onChange={(e) => onFilterChange('semester', e.target.value)}
          >
            <option value="">Todos</option>
            {semesters.map(sem => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        {/* Ordenamiento */}
        <div className="filter-group">
          <label htmlFor="sort-select">Ordenar por</label>
          <select 
            id="sort-select"
            className="filter-select"
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">Predeterminado</option>
            <option value="code">Por Sigla</option>
            <option value="name">Alfabético</option>
          </select>
        </div>

        {/* Vista */}
        <div className="filter-group view-toggle">
          <label>Vista</label>
          <div className="view-buttons">
            <button 
              className={`view-btn ${currentView === 'grid' ? 'active' : ''}`}
              onClick={() => onViewChange('grid')}
              title="Vista de grilla"
            >
              ⊞
            </button>
            <button 
              className={`view-btn ${currentView === 'list' ? 'active' : ''}`}
              onClick={() => onViewChange('list')}
              title="Vista de lista"
            >
              ≡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseFilters;
