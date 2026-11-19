import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");
  const [isLoading, setIsLoading] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);

  const isNameValid =
  name.trim().length >= 2 &&
  name.length <= 40;

  const isDescriptionValid =
  description.trim().length >= 2 &&
  description.length <= 200;

  const isFormValid = isNameValid && isDescriptionValid;

  const showNameError =
  !isNameValid && (nameTouched || name.length > 0);

  const showDescriptionError =
  !isDescriptionValid &&
  (descriptionTouched || description.length > 0);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!isFormValid || isLoading) {
      return;
    }
    
    try {
      setIsLoading(true);
      await handleUpdateUser(name, description);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
    className="popup__form" 
    id="edit-profile-form"
    onSubmit={handleSubmit}
    >
            <input
              className={`popup__input popup__input_type_name ${
                showNameError
                ? "popup__input_type_error"
                : ""
              }`}
              id="profile-name-input"
              name="name"
              placeholder="Nombre"
              type="text"
              required
              minLength={2}
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
            />

            <span
              className={`popup__error ${
              showNameError
                ? "popup__error_visible"
                : ""
              }`}
              id="profile-name-input-error"
            >
              {showNameError
              ? "El nombre debe tener entre 2 y 40 caracteres válidos."
              : ""}
            </span>

            <input
              className={`popup__input popup__input_type_description ${
                showDescriptionError
                ? "popup__input_type_error"
                : ""
              }`}
              id="profile-description-input"
              name="description"
              placeholder="Acerca de mí"
              type="text"
              required
              minLength={2}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setDescriptionTouched(true)}
            />

            <span
            className={`popup__error ${
              showDescriptionError
                ? "popup__error_visible"
                : ""
            }`}
            id="profile-description-input-error"
            >
            {showDescriptionError
            ? "La descripción debe tener entre 2 y 200 caracteres válidos."
            : ""}
            </span> 
            
            <button 
              className="button popup__button" 
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </form>
    );
}