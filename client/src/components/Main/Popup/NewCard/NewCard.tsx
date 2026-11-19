import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [linkTouched, setLinkTouched] = useState(false);

  const isNameValid = name.trim().length >= 2 && name.length <= 30;
  const isLinkValid = (() => {
    try {
      const url = new URL(link);
      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        Boolean(url.hostname)
      )
    } catch {
      return false;
    }
  })();

  const isFormValid = isNameValid && isLinkValid;
  const showNameError = !isNameValid && (nameTouched || name.length > 0);
  const showLinkError = !isLinkValid && (linkTouched || link.length > 0);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!isFormValid || isLoading) return;
  
    try {
    setIsLoading(true);
    await handleAddPlaceSubmit(name, link);
  } finally {
    setIsLoading(false);
  }
};

  return (
  <form
    className="popup__form"
    id="new-card-form"
    onSubmit={handleSubmit}
  >
  
    <input
      className={`popup__input popup__input_type_card-name ${
        showNameError ? "popup__input_type_error" : ""
      }`}
      id="place-name-input"
      name="place-name"
      placeholder="Título"
      required
      type="text"
      minLength={2}
      maxLength={30}
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={() => setNameTouched(true)}
    />

    <span
      className={`popup__error ${
        showNameError ? "popup__error_visible" : ""
      }`}
      id="place-name-input-error"
    >
      {showNameError
        ? "El título debe tener entre 2 y 30 caracteres válidos."
        : ""}
    </span>

    <input
      className={`popup__input popup__input_type_url ${
        showLinkError ? "popup__input_type_error" : ""
      }`}
      id="place-link-input"
      name="link"
      placeholder="Enlace a la imagen"
      required
      type="url"
      value={link}
      onChange={(e) => setLink(e.target.value)}
      onBlur={() => setLinkTouched(true)}
    />

    <span
      className={`popup__error ${
        showLinkError ? "popup__error_visible" : ""
      }`}
      id="place-link-input-error"
    >
      {showLinkError
        ? "Introduce una URL válida que comience con http:// o https://."
        : ""}
    </span>

    <button
      className="button popup__button"
      type="submit"
      disabled={isLoading || !isFormValid}
    >
      {isLoading ? "Creando..." : "Crear"}
    </button>
  </form>
);
}