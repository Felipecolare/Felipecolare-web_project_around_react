import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function EditProfile({ isLoading }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // Obtém o objeto de usuário atual e função de atualização

  const [name, setName] = useState(''); // Adiciona a variável de estado para o nome (name)
  const [description, setDescription] = useState(''); // Adicione a variável de estado para a descrição (description)

  // Atualizar campos quando currentUser mudar
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    handleUpdateUser({ name, about: description }); // Atualiza as informações do usuário
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="profile-name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Nome"
          required
          type="text"
          value={name} // Vincular nome ao campo de entrada
          onChange={handleNameChange} // Adicionar manipulador onChange
          disabled={isLoading}
        />
        <span className="popup__error" id="profile-name-error"></span>
      </label>
      
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_about"
          id="profile-about"
          maxLength="200"
          minLength="2"
          name="about"
          placeholder="Sobre mim"
          required
          type="text"
          value={description} // Vincular descrição ao campo de entrada
          onChange={handleDescriptionChange} // Adicionar manipulador onChange
          disabled={isLoading}
        />
        <span className="popup__error" id="profile-about-error"></span>
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