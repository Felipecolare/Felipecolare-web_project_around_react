import { useState } from 'react';
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import '../index.css'

function App() {
  const [popup, setPopup] = useState(null);

  // Para abrir um popup
  const handleEditProfileClick = () => setPopup('edit-profile');
  const handleAddPlaceClick = () => setPopup('new-card');
  const handleEditAvatarClick = () => setPopup('edit-avatar');

  // Para fechar
  const closeAllPopups = () => setPopup(null);

  return (
    <div className="page">
      <Header 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Main 
        popup={popup}
        closeAllPopups={closeAllPopups}
      />
      <Footer />
    </div>
  )
}

export default App