import { Home } from './components/Home';
import { Signup } from './components/Signup';
import Signin from './components/Signin';
import PerfilUsuario from './components/PerfilUsuario';
import { CrearListaRegalos } from './components/CrearListaRegalos';
import PerfilAdmin from './components/PerfilAdmin';

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
    path: '/perfilUsuario',
    element: <PerfilUsuario />,
  },
  {
    path: '/perfilAdmin',
    element: <PerfilAdmin />,
  },
];

export default AppRoutes;
