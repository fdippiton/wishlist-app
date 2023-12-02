import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../App";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const PerfilAdmin = ({ rol }) => {
  const [listas, setListas] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const navigate = useNavigate();
  const { user, authenticated } = useContext(MyContext);

  const location = useLocation();
  const pathname = location.pathname;
  const isListaUsuarios = pathname.includes("/admin/lista-usuarios");
  const isListaDeseos = pathname.includes("/admin/lista-deseos");

  useEffect(() => {
    if (!authenticated) {
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

  const cambiarEstatusUsuario = async (usuarioId, estatus) => {
    console.log(usuarioId);

    if (!authenticated) {
      console.error(
        "Usuario no autenticado. Realizar acciones de manejo de errores según tus necesidades."
      );
      return;
    }

    const url =
      estatus === "I"
        ? `http://localhost:5109/api/usuarios/Activar/${usuarioId}`
        : `http://localhost:5109/api/usuarios/Inactivar/${usuarioId}`;

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
          `Usuario con ID ${usuarioId} ${
            estatus === "I" ? "activada" : "inactivada"
          } exitosamente.`
        );
        fetchAdminData();
      } else {
        console.error(
          `Error al ${
            estatus === "I" ? "activar" : "inactivar"
          } el usuario con ID ${usuarioId}.`
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const cambiarFiltro = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  return (
    <div className="container mt-3 mb-5">
      <div className="row ">
        <div className="col-12">
          {authenticated && user ? (
            <div>
              <div
                className="row d-flex justify-content-between mt-3 rounded bg-dark"
                style={{ color: "white" }}
              >
                <div className="col-4 d-flex align-items-center p-3 ">
                  <FaRegUserCircle
                    className="me-2"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <Link
                    className=" text-decoration-none text-white"
                    to="/perfilAdmin"
                    style={{ fontSize: "13px" }}
                  >
                    Admin panel{" "}
                    {
                      user[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                      ]
                    }
                  </Link>
                </div>

                <div className="col-8 d-flex justify-content-end align-items-center">
                  <Link
                    className="me-4 text-decoration-none text-white"
                    to="/admin/lista-usuarios"
                    style={{ fontSize: "13px" }}
                  >
                    Listas de usuarios
                  </Link>
                  <Link
                    className="me-2 text-decoration-none text-white"
                    to="/admin/lista-deseos"
                    style={{ fontSize: "13px" }}
                  >
                    Listas de deseos
                  </Link>
                </div>
              </div>

              {/* <div className="mt-3 text-center">
                <p className="fs-6 fw-bold">Panel de administrador</p>
              </div> */}

              <div className="row d-flex mb-5 justify-content-center">
                {!isListaUsuarios && !isListaDeseos ? (
                  <h4 className="text-center mt-5" style={{ color: "#A8A8A8" }}>
                    Panel Administrador
                  </h4>
                ) : (
                  <>
                    {isListaUsuarios && (
                      <div className="mt-3">
                        <h5 className=" py-3">Lista de usuarios</h5>

                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th style={{ width: "20%" }}>
                                Nombre y Apellidos
                              </th>

                              <th style={{ width: "20%" }}>Correo</th>
                              <th style={{ width: "60%" }}>Estatus</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {/* Renderizar información específica para Lista de Deseos */}
                            {listas &&
                              listas.map((usuarios) => (
                                <tr key={usuarios.UsuId}>
                                  <td
                                    style={{
                                      width: "20%",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <span style={{ fontSize: "13px" }}>
                                      {usuarios.UsuProfilePhoto ? (
                                        <img
                                          src={`data:image/png;base64, ${usuarios.UsuProfilePhoto}`}
                                          alt="Perfil Actual"
                                          className="img-fluid mb-3 rounded-circle me-3"
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                          }}
                                        />
                                      ) : (
                                        <FaRegUserCircle
                                          className="me-3"
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                          }}
                                        />
                                      )}
                                      {usuarios.UsuNombre}{" "}
                                      {usuarios.UsuApellidos}
                                    </span>
                                  </td>
                                  <td
                                    style={{
                                      width: "20%",
                                      verticalAlign: "middle",
                                    }}
                                    className=""
                                  >
                                    <span style={{ fontSize: "13px" }}>
                                      {usuarios.UsuCorreo}
                                    </span>
                                  </td>
                                  <td
                                    style={{
                                      width: "60%",
                                      fontSize: "13px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {usuarios.UsuEstatus == "A"
                                      ? "Activo"
                                      : "Inactivo"}
                                  </td>
                                  <td style={{ verticalAlign: "middle" }}>
                                    <Link
                                      className="ms-2"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        cambiarEstatusUsuario(
                                          usuarios.UsuId,
                                          usuarios.UsuEstatus
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
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {isListaDeseos && (
                      <div className="mt-3">
                        <h5 className=" py-3">Listas de deseos</h5>

                        <div className=" mb-3">
                          <button
                            className={`btn btn-sm me-2 ${
                              filtro === "Todas" ? "btn-primary" : "btn-dark"
                            }`}
                            onClick={() => cambiarFiltro("Todas")}
                          >
                            Todas
                          </button>
                          <button
                            className={`btn btn-sm me-2 ${
                              filtro === "Publicas" ? "btn-primary" : "btn-dark"
                            }`}
                            onClick={() => cambiarFiltro("Publicas")}
                          >
                            Públicas
                          </button>
                          <button
                            className={`btn btn-sm ${
                              filtro === "Privadas" ? "btn-primary" : "btn-dark"
                            }`}
                            onClick={() => cambiarFiltro("Privadas")}
                          >
                            Privadas
                          </button>
                        </div>

                        <div className="row d-flex justify-content-start">
                          {/* Renderizar información específica para Lista de Deseos */}
                          {listas &&
                            listas
                              .filter((listaRegalos) => {
                                if (filtro === "Todas") return true;
                                return (
                                  (filtro === "Publicas" &&
                                    listaRegalos.LisRegLisPriv === "Publica") ||
                                  (filtro === "Privadas" &&
                                    listaRegalos.LisRegLisPriv === "Privada")
                                );
                              })
                              .map((listaRegalos) => (
                                <div
                                  className="col-5 mb-2 mt-4"
                                  key={listaRegalos.LisRegId}
                                >
                                  {listaRegalos.LisRegEstatus == "A" ? (
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
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {listaRegalos.LisRegUsuario}{" "}
                                                  {
                                                    listaRegalos.LisRegUsuarioApellido
                                                  }{" "}
                                                  <br />
                                                </span>{" "}
                                                <div>
                                                  {listaRegalos.LisRegNombre}
                                                  <h6
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Creada{" "}
                                                    {formatDateString(
                                                      listaRegalos.LisRegFecCreacion
                                                    )}
                                                  </h6>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Estatus{" "}
                                                    {listaRegalos.LisRegEstatus ==
                                                    "A"
                                                      ? "activo"
                                                      : "inactivo"}
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
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="card red-100">
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
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {listaRegalos.LisRegUsuario}{" "}
                                                  {
                                                    listaRegalos.LisRegUsuarioApellido
                                                  }{" "}
                                                  <br />
                                                </span>{" "}
                                                <div>
                                                  {listaRegalos.LisRegNombre}
                                                  <h6
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Creada{" "}
                                                    {formatDateString(
                                                      listaRegalos.LisRegFecCreacion
                                                    )}
                                                  </h6>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Estatus{" "}
                                                    {listaRegalos.LisRegEstatus ==
                                                    "A"
                                                      ? "activo"
                                                      : "inactivo"}
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
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <p>No has iniciado sesión.</p>
          )}
        </div>
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
