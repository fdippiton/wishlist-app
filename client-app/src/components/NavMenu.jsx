import React, { useState, useContext, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { MyContext } from '../App';
import { jwtDecode } from 'jwt-decode';
import { BiSolidUserCircle } from 'react-icons/bi';

export function NavMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const { authenticated } = useContext(MyContext);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    // Obtiene el token del localStorage
    const token = localStorage.getItem('accessToken');

    if (token) {
      // Decodifica el token
      const decoded = jwtDecode(token);

      // Guarda la información del usuario en el estado
      setUser(decoded);
      console.log(decoded);
    }
  }, []);

  return (
    <>
      {authenticated ? (
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
            <NavbarBrand tag={Link} to="/">
              Wishlist
            </NavbarBrand>
            <div className="col-4 d-flex align-items-center justify-content-end">
              <h1 className="m-0 pe-2">
                <BiSolidUserCircle />
              </h1>
              <Link to="/perfilUsuario" className="text-decoration-none">
                <p className="m-0 fs-6">
                  {
                    user[
                      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                    ]
                  }
                </p>
              </Link>
            </div>
          </Navbar>
        </header>
      ) : (
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
            <NavbarBrand tag={Link} to="/">
              Wishlist
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/signup">
                    Registrate
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/signin">
                    Iniciar sesi&oacute;n
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Navbar>
        </header>
      )}
    </>
  );
}
