//Imports
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Popup from "./Popup/Popup";
import type { PopupConfig, CardData } from "../../types/types";
import NewCard from "./Popup/NewCard/NewCard";
import EditProfile from "./Popup/EditProfile/EditProfile";
import EditAvatar from "./Popup/EditAvatar/EditAvatar";
import Card from "./Card/Card";

//Type definitions
type MainProps = {
  cards: CardData[];
  popup: PopupConfig | null;
  handleOpenPopup: (config: PopupConfig) => void;
  handleClosePopup: () => void;
  handleCardLike: (card: CardData) => Promise<void>;
  handleCardDelete: (card: CardData) => Promise<void>;
};

//Function to render the main content of the page
function Main({ 
  cards,
  popup,
  handleOpenPopup,
  handleClosePopup,
  handleCardLike,
  handleCardDelete
 }: MainProps) {

const {currentUser} = useContext(CurrentUserContext);
//Hooks: 
//Popup configuration for the "New Card" popup
const newCardPopupConfig: PopupConfig = {
  title: "New place",
  children: <NewCard />,
};
//Popup configuration for the "Edit Profile" popup
const editProfilePopupConfig: PopupConfig = {
  title: "Edit profile",
  children: <EditProfile />,
};
//Popup configuration for the "Edit Avatar" popup
const editAvatarPopupConfig: PopupConfig = {
  title: "Edit avatar",
  children: <EditAvatar />,
};

//Return: Render the main content of the page
  return (
    <main className="content">
        <section className="profile page__section">
          <button 
          className="profile__avatar-button" 
          type="button" 
          aria-label="Editar avatar"
          onClick={() => handleOpenPopup(editAvatarPopupConfig)}
          >
            <img 
            className="profile__image" 
            src={currentUser?.avatar} 
            alt={currentUser?.name || "Avatar"}
             />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser?.name}</h1>
            <button
              aria-label="Editar perfil"
              className ="profile__edit-button"
              type="button"
              onClick={() => handleOpenPopup(editProfilePopupConfig)}
            ></button>
            <p className="profile__description">{currentUser?.about}</p>
          </div>
          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={() => handleOpenPopup(newCardPopupConfig)}
          ></button>
        </section>
        <section className="cards page__section">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
              />
            ))}
          </ul>
        </section>
        {popup && (
          <Popup
            title={popup.title}
            isOpen={true}
            onClose={handleClosePopup}
          >
            {popup.children}
          </Popup>
        )}
    </main>
  );
}

export default Main;

