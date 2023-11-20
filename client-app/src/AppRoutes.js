import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import Signin from "./components/Signin";
import PerfilUsuario from "./components/PerfilUsuario";
import { CrearListaRegalos } from "./components/CrearListaRegalos";
import PerfilAdmin from "./components/PerfilAdmin";
import React from "react";
import { ListaRegalos } from "./components/ListaRegalos";

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
    path: "/crearListaRegalos",
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
  ,
  {
    path: "/listaDeseos/:listaId",
    element: <ListaRegalos />,
  },
];

export default AppRoutes;
