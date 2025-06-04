import { useRef, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function EditAvatar({ isLoading }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(); // Usar ref para obter acesso direto ao elemento de entrada DOM

  function handleSubmit(e) {
    e.preventDefault();
    
    // Enviar dados para o contexto usando o valor da entrada obtido com ref
    handleUpdateAvatar({
      avatar: avatarRef.current.value, // O valor da entrada que obtivemos usando ref
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar-link"
          name="avatar"
          placeholder="Link da imagem"
          required
          type="url"
          ref={avatarRef} // Usar ref em vez de value/onChange
          disabled={isLoading}
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button 
        className={`button popup__button ${isLoading ? 'popup__button_disabled' : ''}`} 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}