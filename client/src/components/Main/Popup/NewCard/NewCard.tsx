import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  
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
    onSubmit={handleSubmit}>
        <input
            className="popup__input popup__input_type_card-name"
            id="place-name-input"
            name="place-name"
            placeholder="Título"
            required
            type="text"
            minLength={2}
            maxLength={30}  
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__error" id="place-name-input-error"></span>
        <input
            className="popup__input popup__input_type_url"
            id="place-link-input"
            name="link"
            placeholder="Enlace a la imagen"
            required
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
        />

        <span className="popup__error" id="place-link-input-error"></span>

        <button 
        className="button popup__button" 
        type="submit"
        disabled={isLoading}
        >
        {isLoading ? "Creating..." : "Create"}
        </button>
    </form>  
    );
}