import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useSearch } from "../Context/SearchContext";
import homeIcon from "../assets/home.png";
import bagIcon from "../assets/bag.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { search, setSearch } = useSearch();
  return (
    <>
      {/* Top bar: small, holds the auth (login/signup) actions on the right */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="navbar-auth">
            {!user ? (
              <div className="navbar-auth-links">
                <Link to="/auth" className="navbutton btn-secondary btn-small">
                  Login
                </Link>
                <h4> | </h4>
                <Link to="/auth" className="navbutton btn-primary btn-small">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="navbar-user">
                <span className="navbar-greeting">Hello, {user.email}</span>
                <button
                  className="btn btn-secondary btn-small"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main bar: brand on the left, Home/Cart links on the right */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src="https://thumb.wikimedia.org/wikipedia/sco/thumb/7/7a/Manchester_United_FC_crest.svg/960px-Manchester_United_FC_crest.svg.png?utm_source=sco.wikipedia.org&utm_campaign=index&utm_content=thumbnail" className="Logo"></img>
            <h3 className="Title">Manchester Yanited</h3>
          </Link>

          {/* Search bar: text is stored in SearchContext so Home can filter products */}
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              <img src={homeIcon} alt="Home" className="homeicon"/>
            </Link>
            <Link to="/checkout" className="navbar-link">
              <img src={bagIcon} alt="Bag" className="bagicon"/>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
