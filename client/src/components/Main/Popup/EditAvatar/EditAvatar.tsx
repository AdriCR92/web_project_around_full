import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarTouched, setAvatarTouched] = useState(false);

  const isAvatarValid = (() => {
    try {
      const url = new URL(avatar);
      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        Boolean(url.hostname)
      )
    } catch {
      return false;
    }
  })();

  const showAvatarError = 
  !isAvatarValid && (avatarTouched || avatar.length > 0);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!isAvatarValid || isLoading) return;

    try {
      setIsLoading(true);
      await handleUpdateAvatar(avatar);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      className="popup__form" 
      id="avatar-form" 
      onSubmit={handleSubmit}
      >
            <input
              className={"popup__input popup__input_type_avatar " + (showAvatarError ? "popup__input_type_error" : "")}
              id="avatar-input"
              name="avatar"
              placeholder="Enlace a la imagen"
              type="url"
              required
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              onBlur={() => setAvatarTouched(true)}
            />

            <span
            className={`popup__error ${
              showAvatarError ? "popup__error_visible" : ""
            }`}
            id="avatar-input-error"
          >
            {showAvatarError
              ? "Introduce una URL válida que comience con http:// o https://."
              : ""}
          </span>

            <button 
            className="button popup__button" 
            type="submit" 
            disabled={isLoading || !isAvatarValid}
            >
            {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </form>
  );
} 