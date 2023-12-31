import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

export function PerfilUsuario() {
  const [listasRegalos, setListasRegalos] = useState(null);
  const { user, authenticated, handleLogout } = useContext(MyContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  var styles = {
    marginBotton: "40px",
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authenticated) {
      navigate("/signin");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (authenticated) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:5109/api/usuarios/${user.UserId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            console.log(data);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error in request:", error);
        }
      };

      fetchUser();
    }
  }, [user, authenticated]);

  useEffect(() => {
    if (authenticated) {
      const fetchUserData = async () => {
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
            console.log(data);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error in request:", error);
        }
      };

      fetchUserData();
    }
  }, [user, authenticated]);

  const inactivarLista = async (listaRegId) => {
    try {
      // Verificar nuevamente la autenticación antes de realizar la solicitud
      if (authenticated) {
        const response = await fetch(
          `http://localhost:5109/api/listaRegalos/Inactivar/${listaRegId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          console.log(`Lista con ID ${listaRegId} inactivado exitosamente.`);

          setListasRegalos((prevListasRegalos) =>
            prevListasRegalos.filter((lista) => lista.LisRegId !== listaRegId)
          );
        } else {
          console.error(`Error al inactivar el artículo con ID ${listaRegId}.`);
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container mt-3 ">
      <div className="row" style={styles}>
        <div>
          {authenticated && user ? (
            <div>
              <div className="row d-flex justify-content-between mt-3 mb-5">
                <div className="col-4 d-flex align-items-center">
                  <div>
                    {userData && userData.usuProfilePhoto !== null ? (
                      <img
                        src={`data:image/png;base64, ${userData.usuProfilePhoto}`}
                        alt="Perfil Actual"
                        className="img-fluid  rounded-circle me-3"
                        style={{ width: "40px", height: "40px" }}
                      />
                    ) : (
                      <BiSolidUserCircle
                        style={{ width: "40px", height: "40px" }}
                      />
                    )}
                  </div>

                  <p className="m-0 fs-5">
                    {"   "}
                    Bienvenid@,{" "}
                    {
                      user[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                      ]
                    }{" "}
                    {
                      user[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
                      ]
                    }
                    !
                  </p>
                </div>

                <div className="row d-flex flex-column align-items-center">
                  {/* Listar listas de regalo */}

                  {/* Lista 1 */}

                  <div className="mt-3 text-center">
                    <h3 className="fs-6">Mis listas de deseos</h3>
                  </div>
                  {listasRegalos &&
                    listasRegalos.map((listaRegalos) => (
                      <div className="col-10 mb-2" key={listaRegalos.LisRegId}>
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
                                  <h6 className="card-title d-flex m-0 ps-2">
                                    {listaRegalos.LisRegNombre}
                                  </h6>
                                </div>
                                <h6 style={{ fontSize: "13px" }}>
                                  Creada{" "}
                                  {formatDateString(
                                    listaRegalos.LisRegFecCreacion
                                  )}
                                </h6>
                              </div>
                              <div className="col-3 d-flex align-items-center justify-content-end">
                                <Link
                                  className="btn btn-outline-dark"
                                  to={`/listaDeseos/${listaRegalos.LisRegId}`}
                                  style={{ fontSize: "13px" }}
                                >
                                  Ver articulos
                                </Link>

                                <Link
                                  className="ms-2"
                                  to={`/editarListaRegalos/${listaRegalos.LisRegId}`}
                                >
                                  <MdEditSquare
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "#3F3F3F",
                                    }}
                                  />
                                </Link>

                                <Link
                                  className="ms-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    inactivarLista(listaRegalos.LisRegId);
                                  }}
                                >
                                  <RiDeleteBin2Fill
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "#3F3F3F",
                                    }}
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="row d-flex justify-content-center mt-3 mb-5">
                  <div className="col-10 d-flex justify-content-center">
                    <Link
                      className="btn btn-outline-dark"
                      style={{ fontSize: "14px" }}
                      to={`/crearListaRegalos/${user.UserId}`}
                    >
                      <MdAddBox style={{ width: "30px", height: "30px" }} />{" "}
                      Nueva lista
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No has iniciado sesión.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDateString(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}
