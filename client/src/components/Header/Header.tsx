import { Link } from "react-router-dom";

type HeaderProps = {
  logo: string;
  email?: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  authLinkText?: string;
  authLinkPath?: string;
};

function Header({
  logo,
  email,
  isLoggedIn,
  onLogout,
  authLinkText,
  authLinkPath,
}: HeaderProps) {
  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      <div className="header__user">
        {isLoggedIn ? (
          <>
            <span className="header__email">{email}</span>

            <button
              className="header__logout"
              type="button"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          authLinkText &&
          authLinkPath && (
            <Link
              className="header__auth-link"
              to={authLinkPath}
            >
              {authLinkText}
            </Link>
          )
        )}
      </div>
    </header>
  );
}

export default Header;