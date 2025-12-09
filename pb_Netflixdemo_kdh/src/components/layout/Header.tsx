import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/header.css";

export const Header: React.FC = () => {
  const { user, logout } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${isScrolled ? "header-solid" : ""}`}>
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="header-logo">
            KDHflix
          </Link>
          <nav className="header-nav desktop-nav">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/popular" className="nav-link">
              Popular
            </NavLink>
            <NavLink to="/search" className="nav-link">
              Search
            </NavLink>
            <NavLink to="/wishlist" className="nav-link">
              Wishlist
            </NavLink>
          </nav>
        </div>

        <div className="header-right">
          {user ? (
            <>
              <span className="header-user">{user.id}</span>
              <button className="btn btn-outline" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin" className="btn btn-primary">
              Sign In
            </Link>
          )}

          <button
            className="hamburger"
            onClick={() => setMobileOpen((p) => !p)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileOpen ? "mobile-drawer-open" : ""}`}>
        <NavLink to="/" end className="drawer-link">
          Home
        </NavLink>
        <NavLink to="/popular" className="drawer-link">
          Popular
        </NavLink>
        <NavLink to="/search" className="drawer-link">
          Search
        </NavLink>
        <NavLink to="/wishlist" className="drawer-link">
          Wishlist
        </NavLink>
      </div>
    </header>
  );
};
