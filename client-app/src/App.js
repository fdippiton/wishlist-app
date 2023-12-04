import React, { createContext, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import Signin from "./components/Signin";
import { Signup } from "./components/Signup";
import { PerfilUsuario } from "./components/PerfilUsuario";
import PerfilAdmin from "./components/PerfilAdmin";
import "./custom.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { CrearListaRegalos } from "./components/CrearListaRegalos";
import { jwtDecode } from "jwt-decode";
import { NavMenu } from "./components/NavMenu";
import { ListaRegalos } from "./components/ListaRegalos";
import CrearArticulo from "./components/CrearArticulo";
import EditarArticulo from "./components/EditarArticulo";
import EditarListaRegalos from "./components/EditarListaRegalos";
import { ListasPublicas } from "./components/ListasPublicas";
import { ArticulosListasPublicas } from "./components/ArticulosListasPublicas";
import { UserAccount } from "./components/UserAccount";

export const MyContext = createContext();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp * 1000; // Convertir la expiración a milisegundos
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          // Token expirado, realizar acciones necesarias (por ejemplo, redirigir al inicio de sesión)
          alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
          handleLogout();
          window.location.href = "/signin";
        } else {
          // Token válido, el usuario está autenticado
          setAuthenticated(true);
        }
      }
    };

    checkToken();
  }, []);

  /* ------------------------------ Manejar login ----------------------------- */
  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    const decoded = jwtDecode(token);
    console.log(decoded);

    setAuthenticated(true);
    setUser(decoded);
  };

  /* ------------------------ Manejar cierre de sesion ------------------------ */
  const handleLogout = () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <MyContext.Provider
      value={{ authenticated, user, handleLogin, handleLogout }}
    >
      <BrowserRouter>
        <Layout>
          <NavMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/perfilUsuario" element={<PerfilUsuario />} />
            <Route path="/perfilAdmin" element={<PerfilAdmin />} />
            <Route
              path="/crearListaRegalos/:usuarioId"
              element=<CrearListaRegalos />
            />
            <Route path="/listaDeseos/:listaId" element={<ListaRegalos />} />
            <Route
              path="/añadirArticulo/:listaId"
              element={<CrearArticulo />}
            />
            <Route
              path="/editarArticulo/:articuloId"
              element={<EditarArticulo />}
            />
            <Route
              path="/editarListaRegalos/:listaRegId"
              element={<EditarListaRegalos />}
            />
            <Route path="/listasUsuario/:userId" element=<ListasPublicas /> />
            <Route
              path="/articulosListasPublicas/:listaRegId"
              element=<ArticulosListasPublicas />
            />
            <Route path="/admin/lista-usuarios" element={<PerfilAdmin />} />
            <Route path="/admin/lista-deseos" element={<PerfilAdmin />} />
            <Route path="/cuentaUsuario/:usuarioId" element=<UserAccount /> />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
