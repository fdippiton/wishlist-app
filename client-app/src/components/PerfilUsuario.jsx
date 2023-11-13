import React, { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(MyContext);

  console.log(authenticated);

  useEffect(() => {
    // Obtiene el token del localStorage
    const token = localStorage.getItem('accessToken');

    if (token) {
      // Decodifica el token
      const decoded = jwtDecode(token);

      // Guarda la información del usuario en el estado
      setUser(decoded);
      console.log(decoded);
    }
  }, []);

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('accessToken'); // Elimina el token del almacenamiento local al cerrar sesión
    navigate('/');
  };

  return (
    <div className="row mt-5">
      <div className="row">
        <h1>Perfil de usuario</h1>
        <div>
          {user ? (
            <div>
              <p>
                Bienvenido,{' '}
                {
                  user[
                    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                  ]
                }
                !
              </p>

              <div className="row">
                {/* Listar listas de regalo */}

                {/* Lista 1 */}
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special list</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="/" className="btn btn-primary">
                      Ver articulos
                    </a>
                  </div>
                </div>

                {/* Lista 2 */}
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special list</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="/" className="btn btn-primary">
                      Ver articulos
                    </a>
                  </div>
                </div>
              </div>
              {/* Renderiza el resto de la interfaz de usuario */}
            </div>
          ) : (
            <p>No has iniciado sesión.</p>
          )}
        </div>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default PerfilUsuario;
