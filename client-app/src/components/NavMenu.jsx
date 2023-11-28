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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light mt-3">
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
                {user &&
                  user[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                  ] === "2" && (
                    <>
                      <div className="dropdown">
                        <button
                          className="btn bg-dark dropdown-toggle text-white"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={toggleDropdown}
                          style={{ fontSize: "13px" }}
                        >
                          Mi cuenta
                        </button>
                        <div
                          className={`dropdown-menu ${isOpen ? "show" : ""}`}
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Link
                            className="dropdown-item"
                            to="/perfilUsuario"
                            style={{ fontSize: "13px" }}
                          >
                            Dashboard
                          </Link>
                          <Link
                            className="dropdown-item"
                            to={`/cuentaUsuario/${user["UserId"]}`}
                            style={{ fontSize: "13px" }}
                          >
                            Perfil
                          </Link>
                          <Link
                            className="dropdown-item text-danger"
                            onClick={handleLogoutClick}
                            style={{ fontSize: "13px" }}
                          >
                            Cerrar Sesión
                          </Link>
                        </div>
                      </div>
                      {/* <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/perfilUsuario"
                          style={{ fontSize: "15px" }}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={`/cuentaUsuario/${user["UserId"]}`}
                          style={{ fontSize: "15px" }}
                        >
                          UserAccount
                        </Link>
                      </li> */}
                    </>
                  )}
                {/* <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/perfilUsuario"
                    style={{ fontSize: "15px" }}
                  >
                    Dashboard
                  </Link>
                </li> */}
                {user &&
                  user[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                  ] === "1" && (
                    <>
                      <div className="nav-item dropdown">
                        <button
                          className="btn bg-dark dropdown-toggle text-white"
                          type="button"
                          id="adminDropdown"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={toggleDropdown}
                          style={{ fontSize: "13px" }}
                        >
                          Admin
                        </button>
                        <div
                          className={`dropdown-menu ${isOpen ? "show" : ""}`}
                          aria-labelledby="adminDropdown"
                        >
                          <Link
                            className="dropdown-item"
                            to="/perfilAdmin"
                            style={{ fontSize: "13px" }}
                          >
                            Perfil Admin
                          </Link>
                          <button
                            className="dropdown-item btn btn-link text-danger"
                            onClick={handleLogout}
                            style={{ fontSize: "13px" }}
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                      {/* <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/perfilAdmin"
                          style={{ fontSize: "15px" }}
                        >
                          Perfil Admin
                        </Link>
                      </li>

                      <li className="nav-item">
                        <button
                          className="btn btn-link nav-link text-danger"
                          onClick={handleLogoutClick}
                          style={{ fontSize: "15px" }}
                        >
                          Cerrar Sesión
                        </button>
                      </li> */}
                    </>
                  )}
                {/* <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-danger"
                    onClick={handleLogoutClick}
                    style={{ fontSize: "15px" }}
                  >
                    Cerrar Sesión
                  </button>
                </li> */}
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
