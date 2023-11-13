import { Home } from './components/Home';
import { Signup } from './components/Signup';
import Signin from './components/Signin';
import PerfilUsuario from './components/PerfilUsuario';
import { CrearListaRegalos } from './components/CrearListaRegalos';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/CrearListaRegalos',
    element: <CrearListaRegalos />,
  },
  {
    path: '/PerfilUsuario',
    element: <PerfilUsuario />,
  },
];

export default AppRoutes;
