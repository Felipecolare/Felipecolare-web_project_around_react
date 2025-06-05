// ===== src/components/Popup/NewCard.jsx =====
import { useState } from 'react';

export default function NewCard({ onAddPlaceSubmit, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    
    // Enviar dados para o Main através da prop onAddPlaceSubmit
    onAddPlaceSubmit({
      name,
      link,
    });

    // Limpar formulário após envio
    setName('');
    setLink('');
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Título"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
          disabled={isLoading}
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Link da imagem"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
          disabled={isLoading}
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button 
        className={`button popup__button ${isLoading ? 'popup__button_disabled' : ''}`} 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Criando...' : 'Criar'}
      </button>
    </form>
  );
}