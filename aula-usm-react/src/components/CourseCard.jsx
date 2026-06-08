import React from 'react';

function CourseCard({ course, viewMode = 'grid' }) {
  const categoryColor = course.category === 'ELECTRONICA' ? 'electronics' : 'informatics';

  if (viewMode === 'list') {
    return (
      <div className={`course-card-list card-${categoryColor}`}>
        <div className="course-list-badge">
          <span className={`course-badge badge-${categoryColor}`}>{course.category}</span>
        </div>
        <div className="course-list-info">
          <h3 className="course-list-name">{course.name}</h3>
          <p className="course-list-code">{course.code}({course.courseCode})</p>
        </div>
        <div className="course-list-footer">
          <p className="course-list-parallel">{course.parallel}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`course-card card-${categoryColor}`}>
      <div className="course-card-image">
        <span className={`course-badge badge-${categoryColor}`}>{course.category}</span>
      </div>
      <div className="course-card-content">
        <p className="course-code">{course.code}({course.courseCode})</p>
        <h3 className="course-name">{course.name}</h3>
        <p className="course-parallel">{course.parallel}</p>
      </div>
    </div>
  );
}

export default CourseCard;
