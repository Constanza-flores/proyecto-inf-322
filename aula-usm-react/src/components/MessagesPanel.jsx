import React, { useState } from 'react';

function MessagesPanel({ isOpen, onClose, chats, setChats }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Estados para colapsar/expandir las secciones de la lista
  const [showGroupSection, setShowGroupSection] = useState(true);
  const [showPrivateSection, setShowPrivateSection] = useState(true);

  if (!isOpen) return null;

  // Filtrar globalmente según la barra de búsqueda
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    // Marcamos como leído al entrar a la conversación
    setChats(chats.map(c => c.id === chat.id ? { ...c, unread: false } : c));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const updatedMessages = [
      ...activeChat.messages,
      { sender: 'Tú', text: newMessage }
    ];

    setActiveChat({ ...activeChat, messages: updatedMessages });
    setChats(chats.map(c => 
      c.id === activeChat.id ? { ...c, messages: updatedMessages, lastMessage: `Tú: ${newMessage}` } : c
    ));
    setNewMessage('');
  };

  // Separar los chats filtrados por su respectiva categoría
  const groupChats = filteredChats.filter(c => c.category === 'Grupo');
  const privateChats = filteredChats.filter(c => c.category === 'Privado');

  return (
    <div className="messages-sidebar-panel">
      {/* VISTA 1: CONVERSACIÓN ABIERTA */}
      {activeChat ? (
        <div className="chat-window-view">
          <div className="panel-header">
            <button className="back-btn" onClick={() => setActiveChat(null)}>← Volver</button>
            <span className="chat-header-title">{activeChat.name}</span>
            <button className="panel-close" onClick={onClose}>✕</button>
          </div>
          
          <div className="chat-messages-body">
            {activeChat.messages.map((msg, index) => (
              <div key={index} className={`chat-bubble-wrapper ${msg.sender === 'Tú' ? 'own-msg' : 'their-msg'}`}>
                <div className="chat-bubble">
                  <small className="bubble-sender">{msg.sender}</small>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="chat-input-footer" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Escribe un mensaje..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      ) : (
        /* VISTA 2: LISTA DE CONVERSACIONES Y BÚSQUEDA */
        <>
          <div className="panel-header">
            <h3>Mensajes</h3>
            <button className="panel-close" onClick={onClose}>✕</button>
          </div>
          
          <div className="messages-search">
            <input
              type="text"
              placeholder="Búsqueda"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="messages-search-input"
            />
            <button className="messages-search-btn">🔍</button>
          </div>

          <div className="messages-contacts-tab">👤 Contactos</div>

          <div className="messages-list">
            
            {/* SECCIÓN GRUPOS */}
            <div className="messages-section">
              <div 
                className="section-header" 
                onClick={() => setShowGroupSection(!showGroupSection)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <span>{showGroupSection ? '▼' : '›'} Grupo ({groupChats.length})</span>
              </div>
              
              {showGroupSection && groupChats.map(contact => (
                <div 
                  key={contact.id} 
                  className="message-item"
                  onClick={() => handleSelectChat(contact)}
                >
                  <div className="message-avatar-container">
                    <span className="message-avatar">{contact.avatar}</span>
                    {contact.unread && <span className="unread-dot-indicator"></span>}
                  </div>
                  <div className="message-info">
                    <p className="message-name">{contact.name}</p>
                    <span className="message-status">{contact.lastMessage} • {contact.time}</span>
                  </div>
                  <span className="message-arrow">›</span>
                </div>
              ))}
            </div>

            {/* SECCIÓN PRIVADOS */}
            <div className="messages-section">
              <div 
                className="section-header" 
                onClick={() => setShowPrivateSection(!showPrivateSection)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <span>{showPrivateSection ? '▼' : '›'} Privado ({privateChats.length})</span>
              </div>
              
              {showPrivateSection && privateChats.map(contact => (
                <div 
                  key={contact.id} 
                  className="message-item"
                  onClick={() => handleSelectChat(contact)}
                >
                  <div className="message-avatar-container">
                    <span className="message-avatar">{contact.avatar}</span>
                    {contact.unread && <span className="unread-dot-indicator"></span>}
                  </div>
                  <div className="message-info">
                    <p className="message-name">{contact.name}</p>
                    <span className="message-status">{contact.lastMessage} • {contact.time}</span>
                  </div>
                  <span className="message-arrow">›</span>
                </div>
              ))}
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default MessagesPanel;