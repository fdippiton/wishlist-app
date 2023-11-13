import React, { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { BiSolidUserCircle } from 'react-icons/bi';

const PerfilUsuario = () => {
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
    <div className="container mt-3">
      <div className="row">
        <div>
          {user ? (
            <div>
              <div className="row d-flex justify-content-between mt-3">
                <div className="col-4 d-flex align-items-center">
                  <h1 className="m-0 pe-2">
                    <BiSolidUserCircle />
                  </h1>
                  <p className="m-0 fs-4">
                    {'   '}
                    Bienvenid@,{' '}
                    {
                      user[
                        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                      ]
                    }
                    !
                  </p>
                </div>

                <div className="col-2">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <p className="fs-3">Mis listas de deseos</p>
              </div>

              <div className="row d-flex flex-column">
                {/* Listar listas de regalo */}

                {/* Lista 1 */}

                <div className="col-6 mb-2">
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

                {/* Lista 2 */}
                <div className="col-6 mb-2">
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
              </div>
              {/* Renderiza el resto de la interfaz de usuario */}
            </div>
          ) : (
            <p>No has iniciado sesión.</p>
          )}
        </div>
        {/* <button onClick={handleLogout}>Cerrar Sesión</button> */}
      </div>
    </div>
  );
};

export default PerfilUsuario;
