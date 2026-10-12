import Popup from "./Popup";

export default function EditProfilePopup() {
  return (
    <Popup title="Editar perfil">
      <form className="popup__form">
        <input
              className="popup__input popup__input_type_name"
              id="profile-name-input"
              name="name"
              placeholder="Nombre"
              type="text"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error" id="profile-name-input-error"></span>
            <input
              className="popup__input popup__input_type_description"
              id="profile-description-input"
              name="description"
              placeholder="Acerca de mí"
              type="text"
              required
              minLength="2"
              maxLength="200"
            />
            <span
              className="popup__error"
              id="profile-description-input-error"
            ></span>
            <button className="button popup__button" type="submit">Guardar</button>
      </form>
    </Popup>
  );
}