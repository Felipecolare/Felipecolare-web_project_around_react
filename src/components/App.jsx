// ===== src/components/App.jsx =====
import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  // Estado para armazenar os dados do usuário atual
  const [currentUser, setCurrentUser] = useState({});
  
  // Estados dos cartões (elevados do Main)
  const [cards, setCards] = useState([]);
  
  // Estados dos popups (elevados do Main)
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Buscar informações do usuário quando o componente montar
  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do usuário:', err);
      });
  }, []);

  // Carregar cartões iniciais
  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.error('Erro ao carregar cartões:', err);
      });
  }, []);

  // Função para atualizar informações do usuário
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => {
        console.error('Erro ao atualizar usuário:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Função para atualizar avatar do usuário
  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => {
        console.error('Erro ao atualizar avatar:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Função para curtir/descurtir cartão
  const handleCardLike = (card) => {
    // Verificar se o cartão já foi curtido
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    // Enviar solicitação para a API e obter os dados atualizados
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((currentCard) => 
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => {
        console.error('Erro ao curtir cartão:', error);
      });
  };

  // Função para deletar cartão
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        // Usar filter para criar uma nova lista sem o cartão deletado
        setCards((state) => 
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => {
        console.error('Erro ao deletar cartão:', error);
      });
  };

  // Função para adicionar novo cartão
  const handleAddPlaceSubmit = (cardData) => {
    setIsLoading(true);
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => {
        console.error('Erro ao adicionar cartão:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Função para abrir popup
  const handleOpenPopup = (popupData) => {
    setPopup(popupData);
  };
  
  // Função para fechar popup
  const handleClosePopup = () => {
    setPopup(null);
    setSelectedCard(null);
  };

  // Função para abrir imagem
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <CurrentUserContext.Provider value={{ 
      currentUser, 
      handleUpdateUser, 
      handleUpdateAvatar 
    }}>
      <div className="page">
        <Header />
        <Main 
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          selectedCard={selectedCard}
          isLoading={isLoading}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;