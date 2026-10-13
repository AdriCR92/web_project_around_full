type HeaderProps = {
  logo: string;
  email: string;
  onLogout: () => void;
};

function Header({ logo, email, onLogout }: HeaderProps) {
  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      <div className="header__user">
        <span className="header__email">{email}</span>
        <button
          className="header__logout"
          type="button"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;