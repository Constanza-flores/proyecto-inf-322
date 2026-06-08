import React, { useState } from 'react';

function CalendarPage() {
  // Estado para la fecha que se está visualizando (iniciamos en Junio 2026)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Mes 5 es Junio en JS
  
  // Estado para controlar si el Pop-up está abierto
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lista de eventos iniciales
  const [events, setEvents] = useState([
    { id: 1, date: '2026-06-06', time: '00:00', title: 'Vencimiento de Actividad 4', course: 'Física General II' },
    { id: 2, date: '2026-06-08', time: '14:00', title: 'Vencimiento de Tarea 10', course: 'Física General I' },
    { id: 3, date: '2026-06-15', time: '08:30', title: 'Asistencia', course: 'Cálculo I' }
  ]);

  // Estados para los campos del formulario del Pop-up
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventCourse, setEventCourse] = useState('');

  // Nombres de meses y días
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Obtener mes y año actuales del estado
  const mesActual = currentDate.getMonth();
  const anioActual = currentDate.getFullYear();

  // Navegación de meses
  const handlePrevMonth = () => {
    setCurrentDate(new Date(anioActual, mesActual - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(anioActual, mesActual + 1, 1));
  };

  // Agregar nuevo evento desde el Pop-up
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate) return;

    const nuevoEvento = {
      id: Date.now(),
      title: eventTitle,
      date: eventDate,
      time: eventTime || '00:00',
      course: eventCourse || 'Ninguna'
    };

    setEvents([...events, nuevoEvento]);
    
    // Resetear formulario y cerrar pop-up
    setEventTitle('');
    setEventDate('');
    setEventTime('');
    setEventCourse('');
    setIsModalOpen(false);
  };

  // Lógica para calcular la grilla del calendario del mes seleccionado
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOffset = (year, month) => {
    // En JavaScript, el Domingo es 0, Lunes es 1... Convertimos para que Lunes sea 0 y Domingo 6
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const totalDays = getDaysInMonth(anioActual, mesActual);
  const offset = getFirstDayOffset(anioActual, mesActual);

  const daysGridArray = [];
  for (let i = 0; i < offset; i++) {
    daysGridArray.push(null); // Espacios vacíos del mes anterior
  }
  for (let d = 1; d <= totalDays; d++) {
    const mStr = String(mesActual + 1).padStart(2, '0');
    const dStr = String(d).padStart(2, '0');
    daysGridArray.push(`${anioActual}-${mStr}-${dStr}`);
  }

  return (
    <div className="calendar-page-container">
      
      {/* CABECERA PRINCIPAL CON NAVEGACIÓN */}
      <div className="calendar-navigation-header">
        <button className="nav-month-btn" onClick={handlePrevMonth}>
          ◄ {meses[mesActual === 0 ? 11 : mesActual - 1]}
        </button>
        <h2 className="calendar-current-title">
          {meses[mesActual]} {anioActual}
        </h2>
        <button className="nav-month-btn" onClick={handleNextMonth}>
          {meses[mesActual === 11 ? 0 : mesActual + 1]} ►
        </button>
      </div>

      {/* BOTÓN PARA ABRIR POP-UP */}
      <div className="calendar-actions-bar">
        <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
          + Nuevo evento
        </button>
      </div>

      {/* REJILLA DEL CALENDARIO ÚNICO */}
      <div className="single-month-card">
        <div className="weekdays-header">
          {diasSemana.map(d => <span key={d}>{d}</span>)}
        </div>

        <div className="days-grid">
          {daysGridArray.map((dateStr, index) => {
            if (!dateStr) return <div key={`empty-${index}`} className="empty-day"></div>;

            const dayNumber = parseInt(dateStr.split('-')[2]);
            const dayEvents = events.filter(e => e.date === dateStr);

            // Resaltar el día de hoy ficticio si coincide con la captura (7 de Junio 2026)
            const isTargetDay = dateStr === '2026-06-07';

            return (
              <div key={dateStr} className={`day-cell ${isTargetDay ? 'today-highlight' : ''}`}>
                <span className={`day-number ${isTargetDay ? 'today-number-badge' : ''}`}>
                  {dayNumber}
                </span>
                <div className="day-events-list">
                  {dayEvents.map(e => (
                    <div key={e.id} className="calendar-event-tag" title={`${e.course}: ${e.title} (${e.time})`}>
                      <span className="event-bullet">○</span> {e.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POP-UP / MODAL DE NUEVO EVENTO */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <div className="modal-header">
              <h3>Nuevo evento</h3>
              <button className="close-modal-x" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleCreateEvent} className="modal-form-body">
              <div className="form-group">
                <label>Nombre del evento</label>
                <input 
                  type="text" 
                  placeholder="Ej: Entrega de Práctica" 
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Asignatura (Opcional)</label>
                <select value={eventCourse} onChange={(e) => setEventCourse(e.target.value)}>
                  <option value="">Ninguna</option>
                  <option value="Física General I">Física General I</option>
                  <option value="Física General II">Física General II</option>
                  <option value="Cálculo I">Cálculo I</option>
                  <option value="Simulación de Redes">Simulación de Redes</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Hora</label>
                  <input 
                    type="time" 
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer-buttons">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  Guardar evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default CalendarPage;