import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Header() {
  const [logout] = useLazyLogoutQuery();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    logout();
    Navigate(0);
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand d-flex align-items-center">
          <Link
            href="/"
            className="brand-name
          "
          >
            <h4>ZuAI</h4>
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-5 mt-2 mt-md-0">
        <Search />
      </div>
      {isAuthenticated ? (
        <div className="col-12 col-md-4 mt-4 mt-md-0 d-flex justify-content-center text-center">
          <Link className="header-link" to="/posts/create">
            CREATE BLOG
          </Link>

          <Link className="header-link" onClick={handleLogout} to="/">
            LOGOUT
          </Link>
        </div>
      ) : (
        <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
          <Link to="/login" className="btn ms-4" id="login_btn">
            Login
          </Link>
          <Link to="/register" className="btn ms-4" id="login_btn">
            Join Now
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
