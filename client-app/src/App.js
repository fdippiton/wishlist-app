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
// const handleLogout = () => {
//   setAuthenticated(false);
//   localStorage.removeItem('accessToken'); // Elimina el token del almacenamiento local al cerrar sesión
//   history.push('/');
// };

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [rol, setRol] = useState(null);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);

        if (
          decoded &&
          decoded[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ] === '1'
        ) {
          setRol('1'); // Asegúrate de usar una cadena aquí
        } 

        setAuthenticated(true);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        // Manejar el error al decodificar el token
      }
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
            element={<Signin onLogin={handleLogin} />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/crearListaRegalos"
            element={<CrearListaRegalos />}
          ></Route>

          {authenticated && rol === '1' && (
            <Route path="/perfilAdmin" element={<PerfilAdmin />} />
          )}

          {authenticated && rol !== '1' && (
            <Route path="/perfilUsuario" element={<PerfilUsuario />} />
          )}

          {!authenticated && (
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
