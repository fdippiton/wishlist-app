import React, { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import Signin from "./components/Signin";
import { Signup } from "./components/Signup";
import { PerfilUsuario } from "./components/PerfilUsuario";
import PerfilAdmin from "./components/PerfilAdmin";
import "./custom.css";
import { BrowserRouter } from "react-router-dom";
import { CrearListaRegalos } from "./components/CrearListaRegalos";
import { jwtDecode } from "jwt-decode";
import { NavMenu } from "./components/NavMenu";
import { Footer } from "./components/Footer";
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

        if (currentTime < expirationTime) {
          // Token válido, el usuario está autenticado
          setAuthenticated(true);
          setUser(decoded);
        } else {
          // Token expirado, realizar acciones necesarias (por ejemplo, redirigir al inicio de sesión)
          const shouldContinueSession = window.confirm(
            "Tu sesión ha expirado. ¿Deseas continuar la sesión?"
          );

          if (shouldContinueSession) {
            setAuthenticated(true);
            setUser(decoded);
          } else {
            handleLogout(); // Redirigir al inicio de sesión o realizar otras acciones
          }
        }
      }
    };

    checkToken();
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     setAuthenticated(true);
  //     setUser(decoded);
  //   }
  // }, []);

  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    const decoded = jwtDecode(token);
    console.log(decoded);

    setAuthenticated(true);
    setUser(decoded);
  };

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
          {/* <Footer /> */}
        </Layout>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
