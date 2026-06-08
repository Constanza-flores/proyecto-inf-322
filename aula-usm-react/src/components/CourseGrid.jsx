import React from 'react';
import CourseCard from './CourseCard';

function CourseGrid({ courses, viewMode = 'grid' }) {
  if (courses.length === 0) {
    return (
      <div className="no-courses">
        <p>No se encontraron cursos con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className={`courses-grid courses-${viewMode}`}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} viewMode={viewMode} />
      ))}
    </div>
  );
}

export default CourseGrid;
