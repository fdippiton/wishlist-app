import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import Signin from "./components/Signin";
import PerfilUsuario from "./components/PerfilUsuario";
import { CrearListaRegalos } from "./components/CrearListaRegalos";
import PerfilAdmin from "./components/PerfilAdmin";
import React from "react";
import { ListaRegalos } from "./components/ListaRegalos";
import CrearArticulo from "./components/CrearArticulo";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/crearListaRegalos/:usuarioId",
    element: <CrearListaRegalos />,
  },
  {
    path: "/perfilUsuario",
    element: <PerfilUsuario />,
  },
  {
    path: "/perfilAdmin",
    element: <PerfilAdmin />,
  },

  {
    path: "/listaDeseos/:listaId",
    element: <ListaRegalos />,
  },

  {
    path: "/añadirArticulo/:listaId",
    element: <CrearArticulo />,
  },
  {
    path: "/editarArticulo/:articuloId",
    element: <EditarArticulo />,
  },
  {
    path: "/editarListaRegalos/:listaRegId",
    element: <EditarListaRegalos />,
  },
];

export default AppRoutes;
