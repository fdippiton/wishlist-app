import { MyContext } from "../App";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FaGift } from "react-icons/fa6";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { Dropdown } from "react-bootstrap";

export function ListaRegalos() {
  const [listasRegalo, setListasRegalo] = useState(null);
  const [listaArticulos, setlistaArticulos] = useState(null);
  const { user, authenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Todos");
  const [prioridadFiltro, setPrioridadFiltro] = useState("Todas");

  // Obtener listaId de los parámetros de la ruta
  const { listaId } = useParams();

  useEffect(() => {
    if (!authenticated) {
      navigate("/signin");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (authenticated) {
      const fetchUserData = async () => {
        try {
          // Obtener lista de regalos
          const listaRegalosResponse = await fetch(
            `http://localhost:5109/api/listaRegalos/ById/${listaId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (listaRegalosResponse.ok) {
            const data = await listaRegalosResponse.json();
            setListasRegalo(data);

            console.log(data);
          } else {
            console.error("Error fetching user data");
          }

          // Obtener los articulos de la lista de regalos
          const articulosResponse = await fetch(
            `http://localhost:5109/api/articulos/ByList/${listaId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (articulosResponse.ok) {
            const articulosData = await articulosResponse.json();
            setlistaArticulos(articulosData);
            console.log("Articulos:", articulosData);
          } else {
            console.error("Error fetching Articulos data");
          }
        } catch (error) {
          console.error("Error in request:", error);
        }
      };

      fetchUserData();
    }
  }, [user, authenticated, listaId]);

  const inactivarArticulo = async (articuloId) => {
    try {
      if (authenticated) {
        const response = await fetch(
          `http://localhost:5109/api/articulos/Inactivar/${articuloId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          console.log(`Artículo con ID ${articuloId} inactivado exitosamente.`);

          setlistaArticulos((prevListaArticulos) =>
            prevListaArticulos.filter(
              (articulo) => articulo.ArtId !== articuloId
            )
          );
        } else {
          console.error(`Error al inactivar el artículo con ID ${articuloId}.`);
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // const cambiarFiltro = (nuevoFiltro) => {
  //   setFiltro(nuevoFiltro);
  // };

  const cambiarFiltro = (nuevoFiltro) => {
    // Determinar si el nuevoFiltro es de estatus o prioridad
    if (["Todos", "No recibido", "Recibido"].includes(nuevoFiltro)) {
      // Si es un filtro de estatus, actualizar el estado de filtro de estatus
      setFiltro(nuevoFiltro);
      setPrioridadFiltro("Todas");
    } else {
      // Si es un filtro de prioridad, actualizar el estado de filtro de prioridad
      setPrioridadFiltro(nuevoFiltro);
    }
  };

  return (
    <div className="row mt-5">
      {listasRegalo && (
        <div className="row">
          <div className="col-8">
            <h4 className="d-flex align-items-center">
              {" "}
              <FaGift />{" "}
              <span className="ms-2">{listasRegalo.LisRegNombre}</span>
            </h4>
            <h6>
              {formatDate(listasRegalo.LisRegFecCreacion)} -{" "}
              {listasRegalo.LisRegUsuario} {listasRegalo.LisRegUsuarioApellido}
            </h6>
            <h6 className="d-flex align-items-center">
              <RiGitRepositoryPrivateFill />
              <span className="ms-2">{listasRegalo.LisRegLisPriv}</span>
            </h6>
          </div>

          <div className="col-4">
            <h6 className="text-end">Prioridad</h6>
            <div className="d-flex justify-content-end">
              <h6 style={{ fontSize: "13px" }} className="me-2">
                <FcLowPriority style={{ width: "25px", height: "25px" }} /> Baja{" "}
              </h6>
              <h6 style={{ fontSize: "13px" }} className="me-2">
                <FcMediumPriority style={{ width: "25px", height: "25px" }} />{" "}
                Media{" "}
              </h6>
              <h6 style={{ fontSize: "13px" }} className="">
                <FcHighPriority style={{ width: "25px", height: "25px" }} />{" "}
                Alta{" "}
              </h6>
            </div>
          </div>
        </div>
      )}

      <div className="row d-flex justify-content-end">
        <div className="col-4 text-end">
          <div className="mb-3 d-flex justify-content-end align-items-center">
            {" "}
            <Dropdown className="me-3 ">
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
                className="border border-0"
                style={{
                  fontSize: "13px",
                  backgroundColor: "#C3CFE2",
                  color: "black",
                }}
              >
                Estatus: {filtro}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ fontSize: "13px" }}>
                <Dropdown.Item onClick={() => cambiarFiltro("Todos")}>
                  Todos
                </Dropdown.Item>
                <Dropdown.Item onClick={() => cambiarFiltro("No recibido")}>
                  No recibidos
                </Dropdown.Item>
                <Dropdown.Item onClick={() => cambiarFiltro("Recibido")}>
                  Recibidos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-prioridad"
                className="border border-0"
                style={{
                  fontSize: "13px",
                  backgroundColor: "#C3CFE2",
                  color: "black",
                }}
              >
                Prioridad: {prioridadFiltro}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ fontSize: "13px" }}>
                <Dropdown.Item onClick={() => cambiarFiltro("Todas")}>
                  Todas
                </Dropdown.Item>
                <Dropdown.Item onClick={() => cambiarFiltro("Baja")}>
                  Baja
                </Dropdown.Item>
                <Dropdown.Item onClick={() => cambiarFiltro("Media")}>
                  Media
                </Dropdown.Item>
                <Dropdown.Item onClick={() => cambiarFiltro("Alta")}>
                  Alta
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* <div className=" mb-3">
            <button
              className={`btn btn-sm me-2 ${
                filtro === "Todas" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => cambiarFiltro("Todas")}
            >
              Todos
            </button>
            <button
              className={`btn btn-sm me-2 ${
                filtro === "No recibido" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => cambiarFiltro("No recibido")}
            >
              No recibidos
            </button>
            <button
              className={`btn btn-sm ${
                filtro === "Recibido" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => cambiarFiltro("Recibido")}
            >
              Recibidos
            </button>
          </div> */}
        </div>
      </div>

      <div className="row d-flex mt-4 justify-content-center mb-2">
        {/* Listar articulos de la lista */}
        <div className="col-6">
          {listaArticulos &&
            listaArticulos
              .filter((articulo) => {
                // Filtrar por estatus
                const filtroEstatus =
                  filtro === "Todos" ||
                  (filtro === "No recibido" &&
                    articulo.ArtRegStatus === "No recibido") ||
                  (filtro === "Recibido" &&
                    articulo.ArtRegStatus === "Recibido");

                // Filtrar por prioridad
                const filtroPrioridad =
                  prioridadFiltro === "Todas" ||
                  articulo.ArtPrioridad === prioridadFiltro;

                // Retornar true solo si ambas condiciones se cumplen
                return filtroEstatus && filtroPrioridad;
              })
              .map((articulo) => (
                <div className="" key={articulo.ArtId}>
                  <div
                    className="card mb-2 border-0"
                    style={{
                      backgroundColor:
                        articulo.ArtRegStatus === "Recibido"
                          ? "#FFC0CB"
                          : "inherit",
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-11">
                          <div>
                            <h6 className="card-title">{articulo.ArtNombre}</h6>
                          </div>
                          <h6
                            className="card-text"
                            style={{ fontSize: "13px" }}
                          >
                            {articulo.ArtRegStatus}
                          </h6>

                          <div className="d-flex align-items-center">
                            <h4 className="card-text m-0">
                              {articulo.ArtPrioridad === "Baja" ? (
                                <FcLowPriority />
                              ) : articulo.ArtPrioridad === "Media" ? (
                                <FcMediumPriority />
                              ) : (
                                <FcHighPriority />
                              )}
                            </h4>
                            <Link
                              className="ms-2"
                              to={articulo.ArtUrl}
                              target="_blank"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              <FaExternalLinkAlt />
                            </Link>
                          </div>
                        </div>
                        <div className="col-1 d-flex flex-column">
                          <Link
                            className="ms-2"
                            to={`/editarArticulo/${articulo.ArtId}`}
                          >
                            <MdEditSquare
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#3F3F3F",
                              }}
                            />
                          </Link>
                          <br />
                          <Link
                            className="ms-2"
                            onClick={(e) => {
                              e.preventDefault();
                              inactivarArticulo(articulo.ArtId);
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
                          <Link className="ms-2" target="_blank"></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-10 d-flex justify-content-center">
          <Link
            className="btn btn-outline-dark"
            style={{ fontSize: "14px" }}
            to={`/añadirArticulo/${listaId}`}
          >
            <MdAddBox style={{ width: "30px", height: "30px" }} /> Nuevo
            articulo
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}
