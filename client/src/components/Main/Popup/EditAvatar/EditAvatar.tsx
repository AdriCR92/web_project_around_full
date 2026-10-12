import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
  if (!avatarRef.current) return;
  try {
    setIsLoading(true);
    await handleUpdateAvatar(avatarRef.current.value);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form className="popup__form" id="avatar-form" onSubmit={handleSubmit}>
            <input
              className="popup__input popup__input_type_avatar"
              id="avatar-input"
              name="avatar"
              placeholder="Enlace a la imagen"
              type="url"
              required
              ref={avatarRef}
            />
            <span className="popup__error" id="avatar-input-error"></span>
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