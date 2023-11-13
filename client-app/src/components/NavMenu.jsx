import React, { useState, useContext } from 'react';
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

export function NavMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const { authenticated } = useContext(MyContext);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {authenticated ? (
        <div>Hello</div>
      ) : (
        <header>
          <Navbar
            className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
            container
            light
          >
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
