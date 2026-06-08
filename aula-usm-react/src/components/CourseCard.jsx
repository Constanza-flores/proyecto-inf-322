import React from 'react';

const departmentColors = {
  'FISICA': { bg: '#4c63b6', textColor: '#4c63b6' },
  'MATEMATICA': { bg: '#2ea586', textColor: '#2ea586' },
  'ELECTRONICA': { bg: '#0f2d47', textColor: '#0f2d47' },
  'TELEMATICA': { bg: '#6b4c9a', textColor: '#6b4c9a' },
  'INFORMATICA': { bg: '#d4a574', textColor: '#d4a574' },
  'INDUSTRIAS': { bg: '#c17d30', textColor: '#c17d30' },
  'QUIMICA': { bg: '#d94637', textColor: '#d94637' }
};

function CourseCard({ course, viewMode = 'grid' }) {
  const colors = departmentColors[course.department] || departmentColors['ELECTRONICA'];

  if (viewMode === 'list') {
    return (
      <div className="course-card-list" style={{ borderLeftColor: colors.bg }}>
        <div className="course-list-badge">
          <span className="course-badge" style={{ backgroundColor: colors.bg, color: 'white' }}>
            {course.department}
          </span>
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
    <div className="course-card">
      <div className="course-card-image" style={{ backgroundImage: `linear-gradient(135deg, ${colors.bg} 0%, ${adjustBrightness(colors.bg, 20)} 100%)` }}>
        <span className="course-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', color: colors.textColor }}>
          {course.department}
        </span>
      </div>
      <div className="course-card-content">
        <p className="course-code">{course.code}({course.courseCode})</p>
        <h3 className="course-name">{course.name}</h3>
        <p className="course-parallel">{course.parallel}</p>
      </div>
    </div>
  );
}

// Función auxiliar para ajustar el brillo del color
function adjustBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

export default CourseCard;
