import './index.css'

function App() {
  return (
    <div className="page">
      <header className="header page__container">
        <nav className="nav">
          <div className="nav__logo">
            <span className="nav__logo-main">Around</span>
            <span className="nav__logo-sub">The U.S.</span>
          </div>
        </nav>

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
            <button type="button" className="profile__button-edit"></button>
            <p className="profile__subtitle">Explorador</p>
          </div>

          <button type="button" className="profile__button-add"></button>
        </section>
      </header>

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
      </main>

      <footer className="footer page__container">
        <p className="footer__copyright">&copy; 2024 Around The U.S.</p>
      </footer>
    </div>
  )
}

export default App