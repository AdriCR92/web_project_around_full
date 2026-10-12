//Imports
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import logo from "../images/logo.svg";
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import CurrentUserContext from "../contexts/CurrentUserContext";
import type {
  CardData,
  PopupConfig,
  UserData,
} from "../types/types";
import api from "../utils/api";


//Function to render the main application component
function App() {
//State to manage the current user data, cards, and popup configuration
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  //Effect to fetch user data and cards when the component mounts
  useEffect(() => {
    async function loadData() {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);

        setCurrentUser(userData);
        setCards(initialCards);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []); 

  //Functions
  function handleOpenPopup(config: PopupConfig) {
    setPopup(config);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleCardLike = async (card: CardData) => {
    const isLiked = card.isLiked;
    try {
      const apiCall = isLiked
        ? api.removeLike(card._id)
        : api.addLike(card._id);
      const newCard = await apiCall;
      setCards((state) =>
        state.map((c) =>
        c._id === card._id ? newCard : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardDelete = async (card: CardData) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
    };

  const handleUpdateUser = async (name: string, about: string) => {
    try {
      const updatedUser = await api.updateUserProfile(name, about);
        setCurrentUser(updatedUser);
        setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAvatar = async (avatar: string) => {
    try {
     const updatedUser = await api.updateAvatar(avatar);
      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
    console.error(error);
    }
  };

  const handleAddPlaceSubmit = async (name: string, link: string) => {
    try {
      const newCard = await api.addCard(name, link);
      setCards((state) => [newCard, ...state]);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

//Return the main application component with context provider and child components
  return (
    <CurrentUserContext.Provider 
      value={{
      currentUser,
      handleUpdateUser,
      handleUpdateAvatar, 
      handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
      <Header logo={logo} />

      <Main 
      cards={cards}
      popup={popup}
      handleOpenPopup={handleOpenPopup}
      handleClosePopup={handleClosePopup}
      handleCardLike={handleCardLike}
      handleCardDelete={handleCardDelete}
      />

      <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

