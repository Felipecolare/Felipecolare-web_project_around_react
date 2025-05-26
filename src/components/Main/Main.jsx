import Popup from "../Popup/Popup.jsx";
import NewCard from "../Popup/NewCard.jsx";
import EditProfile from "../Popup/EditProfile.jsx";
import EditAvatar from "../Popup/EditAvatar.jsx";

export default function Main({ popup, closeAllPopups }) {
  return (
    <main className="grid__content page__container">
      <div className="grid__card">
        <button type="button" className="grid__card-delete"></button>
        <img 
          src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" 
          alt="Vale de Yosemite" 
          className="grid__card-image" 
        />
        <div className="grid__card-text">
          <h3 className="grid__card-title">Vale de Yosemite</h3>
          <button className="grid__button-heart button-heart-unliked"></button>
        </div>
      </div>

      <div className="grid__card">
        <button type="button" className="grid__card-delete"></button>
        <img 
          src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" 
          alt="Lago Louise" 
          className="grid__card-image" 
        />
        <div className="grid__card-text">
          <h3 className="grid__card-title">Lago Louise</h3>
          <button className="grid__button-heart button-heart-unliked"></button>
        </div>
      </div>

      <div className="grid__card">
        <button type="button" className="grid__card-delete"></button>
        <img 
          src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" 
          alt="Lago di Braies" 
          className="grid__card-image" 
        />
        <div className="grid__card-text">
          <h3 className="grid__card-title">Lago di Braies</h3>
          <button className="grid__button-heart button-heart-unliked"></button>
        </div>
      </div>

      <div className="grid__card">
        <button type="button" className="grid__card-delete"></button>
        <img 
          src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" 
          alt="Latemar" 
          className="grid__card-image" 
        />
        <div className="grid__card-text">
          <h3 className="grid__card-title">Latemar</h3>
          <button className="grid__button-heart button-heart-unliked"></button>
        </div>
      </div>

      <div className="grid__card">
        <button type="button" className="grid__card-delete"></button>
        <img 
          src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" 
          alt="Parque Nacional" 
          className="grid__card-image" 
        />
        <div className="grid__card-text">
          <h3 className="grid__card-title">Parque Nacional</h3>
          <button className="grid__button-heart button-heart-unliked"></button>
        </div>
      </div>

      <div className="grid__card">
        <button type="button" className="grid__card-delete"></button>
        <img 
          src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" 
          alt="Montanhas Care" 
          className="grid__card-image" 
        />
        <div className="grid__card-text">
          <h3 className="grid__card-title">Montanhas Care</h3>
          <button className="grid__button-heart button-heart-unliked"></button>
        </div>
      </div>

      {/* Renderização condicional dos popups */}
      {popup === 'new-card' && (
        <Popup title="Novo local" onClose={closeAllPopups}>
          <NewCard />
        </Popup>
      )}
      
      {popup === 'edit-profile' && (
        <Popup title="Editar perfil" onClose={closeAllPopups}>
          <EditProfile />
        </Popup>
      )}
      
      {popup === 'edit-avatar' && (
        <Popup title="Alterar foto do perfil" onClose={closeAllPopups}>
          <EditAvatar />
        </Popup>
      )}
    </main>
  )
}