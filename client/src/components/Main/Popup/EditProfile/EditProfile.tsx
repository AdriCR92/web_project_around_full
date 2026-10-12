import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    
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
              className="popup__input popup__input_type_name"
              id="profile-name-input"
              name="name"
              placeholder="Nombre"
              type="text"
              required
              minLength={2}
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="popup__error" id="profile-name-input-error"></span>
            <input
              className="popup__input popup__input_type_description"
              id="profile-description-input"
              name="description"
              placeholder="Acerca de mí"
              type="text"
              required
              minLength={2}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span
              className="popup__error"
              id="profile-description-input-error"
            ></span>
            <button 
              className="button popup__button" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
    );
}