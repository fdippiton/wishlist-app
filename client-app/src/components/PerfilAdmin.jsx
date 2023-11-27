import React, { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { MyContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";

const PerfilAdmin = ({ rol }) => {
  const [adminData, setAdminData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
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
            `http://localhost:5109/api/listaRegalos/`,
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
            console.log(data);
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

  const cambiarEstatus = async (listaId, estatus) => {
    console.log(listaId);

    if (!authenticated) {
      console.error(
        "Usuario no autenticado. Realizar acciones de manejo de errores según tus necesidades."
      );
      return;
    }

    const url =
      estatus === "I"
        ? `http://localhost:5109/api/listaRegalos/Activar/${listaId}`
        : `http://localhost:5109/api/listaRegalos/Inactivar/${listaId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        console.log(
          `Lista con ID ${listaId} ${
            estatus === "I" ? "activada" : "inactivada"
          } exitosamente.`
        );

        const fetchAdminData = async () => {
          try {
            const response = await fetch(
              `http://localhost:5109/api/listaRegalos/`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            );

            if (response.ok) {
              const data = await response.json();
              setListasRegalos(data);
              console.log(data);
            } else {
              console.error("Error fetching admin data");
            }
          } catch (error) {
            console.error("Error in request:", error);
          }
        };

        fetchAdminData();

        // setCurrentStatus((prevStatus) => (prevStatus === "I" ? "A" : "I"));

        // // Actualizar el estado directamente sin recargar la página
        // setListasRegalos((prevListasRegalos) => {
        //   const nuevasListasRegalos = prevListasRegalos.map((lista) =>
        //     lista.LisRegId === listaId
        //       ? { ...lista, LisRegEstatus: currentStatus }
        //       : lista
        //   );
        //   console.log("Nuevas listas de regalos:", nuevasListasRegalos);
        //   return nuevasListasRegalos;
        // });
      } else {
        console.error(
          `Error al ${
            estatus === "I" ? "activar" : "inactivar"
          } la lista con ID ${listaId}.`
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container mt-3 mb-5">
      <div className="row">
        <div className="col-12 ">
          {authenticated && user ? (
            <div>
              <div className="row d-flex justify-content-between mt-3">
                <div className="col-4 d-flex align-items-center">
                  <BiSolidUserCircle
                    style={{ width: "50px", height: "50px" }}
                  />

                  <p className="m-0 fs-5">
                    {"   "}
                    Admin{" "}
                    {
                      user[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                      ]
                    }
                  </p>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="fs-6 fw-bold">Listas de deseos de los usuarios</p>
              </div>

              <div className="row d-flex mb-5 justify-content-center">
                {/* Listar listas de regalo */}

                {listasRegalos &&
                  listasRegalos.map((listaRegalos) => (
                    <div className="col-5 mb-2" key={listaRegalos.LisRegId}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-9">
                              <div className="d-flex align-items-center">
                                <h4>
                                  {" "}
                                  {listaRegalos.LisRegLisPriv &&
                                  listaRegalos.LisRegLisPriv === "Publica" ? (
                                    <MdOutlinePublic />
                                  ) : (
                                    <RiGitRepositoryPrivateFill />
                                  )}
                                </h4>
                                <h6 className="card-title d-flex flex-column m-0 ps-2">
                                  <span style={{ fontSize: "12px" }}>
                                    {listaRegalos.LisRegUsuario}{" "}
                                    {listaRegalos.LisRegUsuarioApellido} <br />
                                  </span>{" "}
                                  <div>
                                    {listaRegalos.LisRegNombre}
                                    <h6 style={{ fontSize: "12px" }}>
                                      Creada{" "}
                                      {formatDateString(
                                        listaRegalos.LisRegFecCreacion
                                      )}
                                    </h6>
                                    <span style={{ fontSize: "12px" }}>
                                      Estatus {listaRegalos.LisRegEstatus}
                                    </span>
                                  </div>
                                </h6>
                              </div>
                            </div>
                            <div className="col-3">
                              <Link
                                className="ms-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  cambiarEstatus(
                                    listaRegalos.LisRegId,
                                    listaRegalos.LisRegEstatus
                                  );
                                }}
                              >
                                <FaExchangeAlt
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#3F3F3F",
                                  }}
                                />
                              </Link>
                            </div>
                            {/* <div className="col-3 d-flex align-items-center justify-content-end">
                              <Link
                                className="btn btn-outline-dark"
                                to={`/listaDeseos/${listaRegalos.LisRegId}`}
                                style={{ fontSize: "13px" }}
                              >
                                Ver articulos
                              </Link>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

function formatDateString(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}

export default PerfilAdmin;
