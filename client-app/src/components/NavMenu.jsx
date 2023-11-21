import React, { useState, useContext, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavMenu.css";
import { MyContext } from "../App";
import { jwtDecode } from "jwt-decode";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaGift } from "react-icons/fa6";

export function NavMenu() {
  const { authenticated, user, handleLogout } = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ fontSize: "25px" }}
        >
          <FaGift className="me-2" /> Wishlist
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {authenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/perfilUsuario"
                    style={{ fontSize: "15px" }}
                  >
                    Dashboard
                  </Link>
                </li>
                {user &&
                  user[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                  ] === "1" && (
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/perfilAdmin"
                        style={{ fontSize: "15px" }}
                      >
                        Perfil Admin
                      </Link>
                    </li>
                  )}
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-danger"
                    onClick={handleLogoutClick}
                    style={{ fontSize: "15px" }}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
