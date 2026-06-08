import React, { useState } from 'react';

function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="university-logo">
            <div className="logo-placeholder">UFSM</div>
          </div>
          <div className="university-info">
            <h1 className="university-name">UNIVERSIDAD TÉCNICA</h1>
            <p className="university-subtitle">FEDERICO SANTA MARÍA</p>
          </div>
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li><a href="#home" className="nav-link active">Página Principal</a></li>
            <li><a href="#area" className="nav-link">Área personal</a></li>
            <li><a href="#courses" className="nav-link">Mis cursos</a></li>
          </ul>
        </nav>
        <div className="header-icons">
          <div className="header-search-wrapper">
            <input
              type="text"
              className="header-search-input"
              placeholder="Buscar cursos"
              value={searchValue}
              onChange={handleSearch}
            />
            <button className="icon-button search-icon">🔍</button>
          </div>
          <button className="icon-button notification-icon">🔔</button>
          <button className="icon-button message-icon">💬</button>
          <button className="icon-button profile-icon">👤</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
