export default function EditAvatar() {
  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar-link"
          name="avatar"
          placeholder="Link da imagem"
          required
          type="url"
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}