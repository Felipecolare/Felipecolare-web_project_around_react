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

  // Cartões de exemplo caso a API falhe
  const fallbackCards = [
    {
      _id: "1",
      name: "Vale de Yosemite",
      link: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      owner: { _id: "default-user" },
      likes: [{ _id: "user1" }, { _id: "user2" }]
    },
    {
      _id: "2", 
      name: "Lago Louise",
      link: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      owner: { _id: "default-user" },
      likes: [{ _id: "user1" }]
    },
    {
      _id: "3",
      name: "Gatinho",
      link: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      owner: { _id: "default-user" },
      likes: []
    }
  ];

  // Buscar informações do usuário quando o componente montar
  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do usuário:', err);
        // Fallback para usuário padrão
        setCurrentUser({
          name: "Jacques Cousteau",
          about: "Explorador",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          _id: "default-user"
        });
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
        // Usar cartões de fallback para garantir que sempre haja conteúdo
        setCards(fallbackCards);
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
        // Atualizar localmente mesmo se a API falhar
        setCurrentUser(prev => ({ ...prev, ...data }));
        handleClosePopup();
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
        // Atualizar localmente mesmo se a API falhar
        setCurrentUser(prev => ({ ...prev, avatar: data.avatar }));
        handleClosePopup();
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
        // Simular like local se a API falhar
        setCards((state) => 
          state.map((currentCard) => {
            if (currentCard._id === card._id) {
              const newLikes = isLiked 
                ? currentCard.likes.filter(like => like._id !== currentUser._id)
                : [...currentCard.likes, { _id: currentUser._id }];
              return { ...currentCard, likes: newLikes };
            }
            return currentCard;
          })
        );
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
        // Deletar localmente mesmo se a API falhar
        setCards((state) => 
          state.filter((currentCard) => currentCard._id !== card._id)
        );
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
        // Criar cartão local se a API falhar
        const localCard = {
          _id: Date.now().toString(),
          ...cardData,
          owner: currentUser,
          likes: []
        };
        setCards([localCard, ...cards]);
        handleClosePopup();
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