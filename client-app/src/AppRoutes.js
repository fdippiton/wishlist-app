import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
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
];

export default AppRoutes;
