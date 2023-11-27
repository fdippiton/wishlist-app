import React, { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { MyContext } from "../App";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const PerfilAdmin = ({ rol }) => {
  const [adminData, setAdminData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();
  const { user, authenticated, handleLogout } = useContext(MyContext);

  const location = useLocation();
  const pathname = location.pathname;
  const isListaUsuarios = pathname.includes("/admin/lista-usuarios");
  const isListaDeseos = pathname.includes("/admin/lista-deseos");

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login if not authenticated
      navigate("/signin");
    }
  }, [authenticated, navigate]);

  const fetchAdminData = async () => {
    try {
      let url;

      if (isListaUsuarios) {
        url = `http://localhost:5109/api/usuarios/listaUsuarios`;
      } else if (isListaDeseos) {
        url = `http://localhost:5109/api/listaRegalos`;
      } else {
        // Manejar caso por defecto o mostrar un error
        console.error("Tipo de lista no válido");
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setListas(data);
        console.log(data);
      } else {
        console.error("Error fetching admin data");
      }
    } catch (error) {
      console.error("Error in request:", error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchAdminData();
    }
  }, [user, authenticated, isListaUsuarios, isListaDeseos]);

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
        fetchAdminData();
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
              <div
                className="row d-flex justify-content-between mt-3"
                style={{ backgroundColor: "#A7A9AC" }}
              >
                <div className="col-4 d-flex align-items-center p-2 ">
                  <FaRegUserCircle
                    className="me-2"
                    style={{ width: "40px", height: "40px" }}
                  />

                  <p className="m-0 fs-5">
                    {"   "}
                    Admin panel{" "}
                    {
                      user[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                      ]
                    }
                  </p>
                </div>

                <div className="col-8 d-flex justify-content-end align-items-center">
                  <Link
                    className="me-4 text-decoration-none text-dark"
                    to="/admin/lista-usuarios"
                  >
                    Listas de usuarios
                  </Link>
                  <Link
                    className="me-2 text-decoration-none text-dark"
                    to="/admin/lista-deseos"
                  >
                    Listas de deseos
                  </Link>
                </div>
              </div>

              {/* <div className="mt-3 text-center">
                <p className="fs-6 fw-bold">Panel de administrador</p>
              </div> */}

              <div className="row d-flex mb-5 justify-content-center">
                {isListaUsuarios && (
                  <div className="">
                    <h5 className="text-center mt-3">Lista de usuarios</h5>

                    <div className="row d-flex justify-content-center">
                      {/* Renderizar información específica para Lista de Deseos */}
                      {listas &&
                        listas.map((usuarios) => (
                          <div className="col-5 mb-2 mt-2" key={usuarios.UsuId}>
                            <div className="card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-9">
                                    <div className="d-flex align-items-center">
                                      <h5 className="card-title d-flex flex-column m-0 ps-2">
                                        <span style={{ fontSize: "12px" }}>
                                          {usuarios.UsuNombre}{" "}
                                          {usuarios.UsuApellidos} <br />
                                          {usuarios.UsuCorreo}
                                        </span>{" "}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-3 text-end">
                                    {/* <Link
                                      className="ms-2"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        cambiarEstatus(
                                          usuarios.LisRegId,
                                          usuarios.LisRegEstatus
                                        );
                                      }}
                                    >
                                      <FaExchangeAlt
                                        style={{
                                          width: "15px",
                                          height: "15px",
                                          color: "#3F3F3F",
                                        }}
                                      />
                                    </Link> */}
                                  </div>
                                  {/* <div className="col-3 d-flex align-items-center justify-content-end">
                  <Link
                    className="btn btn-outline-dark"
                    to={`/listaDeseos/${listaRegalos.LisRegId}`}
                    style={{ fontSize: "13px" }}
                  >
                    Ver artículos
                  </Link>
                </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {isListaDeseos && (
                  <div className="">
                    <h5 className="text-center mt-3">Lista de deseos</h5>

                    <div className="row d-flex justify-content-center">
                      {/* Renderizar información específica para Lista de Deseos */}
                      {listas &&
                        listas.map((listaRegalos) => (
                          <div
                            className="col-5 mb-2 mt-4"
                            key={listaRegalos.LisRegId}
                          >
                            <div className="card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-9">
                                    <div className="d-flex align-items-center">
                                      <h4>
                                        {" "}
                                        {listaRegalos.LisRegLisPriv &&
                                        listaRegalos.LisRegLisPriv ===
                                          "Publica" ? (
                                          <MdOutlinePublic />
                                        ) : (
                                          <RiGitRepositoryPrivateFill />
                                        )}
                                      </h4>
                                      <h6 className="card-title d-flex flex-column m-0 ps-2">
                                        <span style={{ fontSize: "12px" }}>
                                          {listaRegalos.LisRegUsuario}{" "}
                                          {listaRegalos.LisRegUsuarioApellido}{" "}
                                          <br />
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
                                  <div className="col-3 text-end">
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
                                          width: "15px",
                                          height: "15px",
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
                    Ver artículos
                  </Link>
                </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
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
