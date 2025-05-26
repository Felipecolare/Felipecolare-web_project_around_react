export default function Header({ onEditProfile, onAddPlace, onEditAvatar }) {
  return (
    <header className="header page__container">
      <nav className="nav">
        <div className="nav__logo">
          <span className="nav__logo-main">Around</span>
          <span className="nav__logo-sub">The U.S.</span>
        </div>
      </nav>

      <section className="profile">
        <div className="profile__card-image" onClick={onEditAvatar}>
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
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">Explorador</p>
        </div>

        <button 
          type="button" 
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>
    </header>
  )
}