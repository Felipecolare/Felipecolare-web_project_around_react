// ===== src/components/Main/Main.jsx =====
import { useState } from "react";
import Popup from "../Popup/Popup.jsx";
import ImagePopup from "../Popup/ImagePopup.jsx";
import EditProfile from "../Popup/EditProfile.jsx";
import EditAvatar from "../Popup/EditAvatar.jsx";
import NewCard from "../Popup/NewCard.jsx";
import Card from "../Card/Card.jsx"; // Adicione esta linha

// Dados fictícios (mock data)
const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);

  // Objetos de popup
  const newCardPopup = { title: "New card", children: <NewCard /> };
  const editProfilePopup = { title: "Edit profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Change profile picture", children: <EditAvatar /> };
  
  // Função para abrir popup
  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  
  // Função para fechar popup
  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="page__container">
      <section className="profile">
        <div className="profile__card-image">
          <img
            src="src/images/jacques_cousteau.png"
            alt="Jacques Cousteau"
            className="profile__image"
          />
        </div>
        <div className="profile__card">
          <h2 className="profile__title">Jacques Cousteau</h2>
          <button 
            type="button" 
            className="profile__button-edit"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__subtitle">Explorador</p>
        </div>

        <button 
          type="button" 
          className="profile__button-add"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <ul className="cards__list">
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </ul>

      {/* Renderização condicional do popup */}
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  )
}