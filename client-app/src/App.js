import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Signin from './components/Signin';
import { Signup } from './components/Signup';
import PerfilUsuario from './components/PerfilUsuario';
import PerfilAdmin from './components/PerfilAdmin';
import './custom.css';
import { BrowserRouter } from 'react-router-dom/dist';
import { CrearListaRegalos } from './components/CrearListaRegalos';
import { jwtDecode } from 'jwt-decode';

export const MyContext = createContext();

const App = () => {
  // static displayName = App.name;

  const [authenticated, setAuthenticated] = useState(false);
  const [rol, setRol] = useState(null);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  // const handleLogout = () => {
  //   setAuthenticated(false);
  //   localStorage.removeItem('accessToken'); // Elimina el token del almacenamiento local al cerrar sesión
  //   history.push('/');
  // };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuthenticated(true);
    }

    const decoded = jwtDecode(token);
    console.log(decoded);
    if (
      decoded[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] === '1'
    ) {
      setRol(1);
    }
  }, []);

  return (
    <MyContext.Provider value={{ authenticated, setAuthenticated }}>
      <BrowserRouter>
        <Layout />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/signin"
            element={<Signin onLogin={handleLogin} />} // Pass the handleLogin prop
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/crearListaRegalos"
            element={<CrearListaRegalos />}
          ></Route>

          {authenticated ? (
            rol === 1 ? (
              <Route path="/perfilAdmin" element={<PerfilAdmin />} />
            ) : (
              <Route path="/perfilUsuario" element={<PerfilUsuario />} />
            )
          ) : (
            <>
              <Route
                path="/signup"
                element={<Signup onLogin={handleLogin} />}
              />
              <Route
                path="/signin"
                element={<Signin onLogin={handleLogin} />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
