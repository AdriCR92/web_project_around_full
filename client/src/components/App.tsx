//Imports
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { login, register, checkToken } from "../utils/auth";
import logo from "../images/logo.svg";
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

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

  //Effect to check for a valid JWT token in local storage and set the logged-in state accordingly
  useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return;
  }
  checkToken(token)
    .then((data) => {
      setIsLoggedIn(true);
      setUserEmail(data.data.email);
    })
    .catch((error) => {
      console.error(error);
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
    })
    .finally(() => {
      setIsCheckingToken(false);
    });
}, []);

  //Functions
  async function handleLogin(email: string, password: string) {
  try {
    const data = await login({ email, password });

    localStorage.setItem("jwt", data.token);
    setIsLoggedIn(true);
    setUserEmail(email);
    navigate("/");
  } catch (error) {
    console.error(error);
  }
}

async function handleRegister(email: string, password: string) {
  try {
    await register({ email, password });
    navigate("/signin");
  } catch (error) {
    console.error(error);
  }
}

function handleLogout() {
  localStorage.removeItem("jwt");
  setIsLoggedIn(false);
  setUserEmail("");
  navigate("/signin");
}

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

//Main application component with context provider and child components
const mainApp = (
  <CurrentUserContext.Provider
    value={{
      currentUser,
      handleUpdateUser,
      handleUpdateAvatar,
      handleAddPlaceSubmit,
    }}
  >
    <div className="page__content">
      <Header 
      logo={logo} 
      email={userEmail}
      onLogout={handleLogout}
      />

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

if (isCheckingToken) {
  return null;
}

//Return the main application component with context provider and child components
  return (
  <Routes>
    <Route
      path="/signin"
      element={
        isLoggedIn ? (
          <Navigate to="/" replace />
        ) : (
          <Login onLogin={handleLogin} />
        )
      }
    />
    <Route
      path="/signup"
      element={
        isLoggedIn ? (
          <Navigate to="/" replace />
        ) : (
          <Register onRegister={handleRegister} />
        )
      }
    />
    <Route
      path="/"
      element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          {mainApp}
        </ProtectedRoute>
      }
    />
  </Routes>
);
}

export default App;

