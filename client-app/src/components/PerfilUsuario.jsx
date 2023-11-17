import React, { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
// import { MyContext } from '../App';
// import { useNavigate } from 'react-router-dom';
import { BiSolidUserCircle } from 'react-icons/bi';

const PerfilUsuario = () => {
  const [user, setUser] = useState(null);
  const [currentToken, setcurrentToken] = useState(null);
  const [listasRegalos, setListasRegalos] = useState([]);

  const obtenerToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      return token;
    } else {
      return 'Token no existe'
    }
   
  };

  useEffect(() => {
    const token = obtenerToken();

    if (token) {
      const fetchListasRegalos = async () => {
        try {
          // console.log('Fetching Listas Regalos...');
          // console.log('API URL:', process.env.WISHLIST_API);
          // console.log('UserId:', user['UserId']);
          // console.log('Token:', token);

          const response = await fetch(
            'http://localhost:5109/api/listaRegalos/' + token['UserId'],
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.ok) {
            const lists = await response.json();
            setListasRegalos(lists);
            // console.log(response);
            // console.log(lists);
            const values = lists.$values;
            values.forEach((item) => {
              // Aquí puedes hacer algo con cada elemento dentro de $values
              console.log(item);
            });
          } else {
            // console.error(
            //   'Error en la solicitud:',
            //   response.status,
            //   response.statusText
            // );
            const responseBody = await response.text();
            console.error('Cuerpo de la respuesta:', responseBody);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

      fetchListasRegalos();
    }
  }, []);

  // const handleLogout = () => {
  //   setAuthenticated(false);
  //   localStorage.removeItem('accessToken'); // Elimina el token del almacenamiento local al cerrar sesión
  //   navigate('/');
  // };

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

                {/* <div className="col-2">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div> */}

                <div className="mt-3">
                  <p className="fs-3">Mis listas de deseos</p>
                </div>

                <div className="row d-flex flex-column">
                  {/* Listar listas de regalo */}

                  {/* Lista 1 */}

                  {listasRegalos &&
                    listasRegalos.$values &&
                    listasRegalos.$values.map((listaRegalos) => (
                      <div className="col-6 mb-2" key={listaRegalos.lisRegId}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">
                              {listaRegalos.LisRegNombre}
                            </h5>
                            <p className="card-text">
                              {listaRegalos.LisRegLisPriv &&
                                listaRegalos.LisRegLisPriv.LisPrivPrivacidad}
                            </p>
                            <a href="/" className="btn btn-outline-primary">
                              Ver articulos
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* Renderiza el resto de la interfaz de usuario */}
              </div>
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
