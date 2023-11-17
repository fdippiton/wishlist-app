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

export function NavMenu() {
  const { authenticated, user, handleLogout } = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/signin");
  };

  // useEffect(() => {
  //   // Obtiene el token del localStorage
  //   const token = localStorage.getItem("accessToken");

  //   if (token) {
  //     // Decodifica el token
  //     const decoded = jwtDecode(token);

  //     // Guarda tl token decodificado
  //     setUser(decoded);
  //     console.log(decoded);

  //     if (
  //       decoded[
  //         "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  //       ] === "1"
  //     ) {
  //       // Establecer el rol de usuario
  //       setRol(1);
  //     }
  //   }
  // }, [authenticated]);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Wishlist
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {authenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfilUsuario">
                    Perfil Usuario
                  </Link>
                </li>
                {user &&
                  user[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                  ] === "1" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/perfilAdmin">
                        Perfil Admin
                      </Link>
                    </li>
                  )}
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogoutClick}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Iniciar Sesión
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
