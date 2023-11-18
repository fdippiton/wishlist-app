import React, { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";

const PerfilAdmin = ({ rol }) => {
  const [adminData, setAdminData] = useState(null);
  const [listasRegalos, setListasRegalos] = useState([]);
  const navigate = useNavigate();
  const { user, authenticated, handleLogout } = useContext(MyContext);

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login if not authenticated
      navigate("/signin");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (authenticated) {
      // Fetch admin-specific data using user.UserId and token
      const fetchAdminData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5109/api/listaRegalos/${user.UserId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setListasRegalos(data);

            listasRegalos.forEach((item) => {
              // Aquí puedes hacer algo con cada elemento dentro de $values
              console.log(item);
            });
          } else {
            console.error("Error fetching admin data");
          }
        } catch (error) {
          console.error("Error in request:", error);
        }
      };

      fetchAdminData();
    }
  }, [user, authenticated]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div>
          {authenticated && user ? (
            <div>
              <div className="row d-flex justify-content-between mt-3">
                <div className="col-4 d-flex align-items-center">
                  <h1 className="m-0 pe-2">
                    <BiSolidUserCircle />
                  </h1>
                  <p className="m-0 fs-4">
                    {"   "}
                    Admin{" "}
                    {
                      user[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
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
                </div> */}
              </div>

              <div className="mt-3">
                <p className="fs-3">Admin</p>
              </div>

              <div className="row d-flex flex-column">
                {/* Listar listas de regalo */}

                {/* Lista 1 */}

                {listasRegalos &&
                  listasRegalos.map((listaRegalos) => (
                    <div className="col-6 mb-2" key={listaRegalos.LisRegId}>
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

                {/* Lista 2 */}
                {/* <div className="col-6 mb-2">
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
                </div> */}
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

export default PerfilAdmin;
