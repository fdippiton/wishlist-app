import { MyContext } from "../App";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FaGift } from "react-icons/fa6";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
import { Dropdown } from "react-bootstrap";

export function ArticulosListasPublicas() {
  const [listasRegalo, setListasRegalo] = useState(null);
  const [listaArticulos, setlistaArticulos] = useState(null);
  const [prioridadFiltro, setPrioridadFiltro] = useState("Todas");

  const { user } = useContext(MyContext);

  // Obtener listaRegId de los parámetros de la ruta
  const { listaRegId } = useParams();

  useEffect(() => {
    // Obtener lista publica
    const fetchUserData = async () => {
      try {
        const listaRegalosResponse = await fetch(
          `http://localhost:5109/api/listaRegalos/ById/${listaRegId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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

        //  Obtener los articulos de una lista de regalos publica
        const articulosResponse = await fetch(
          `http://localhost:5109/api/articulos/listaPublica/${listaRegId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
  }, [user, listaRegId]);

  const cambiarFiltro = (nuevoFiltro) => {
    setPrioridadFiltro(nuevoFiltro);
  };

  return (
    <>
      <div className="row mt-5 ">
        {listasRegalo && (
          <div className="row">
            <div className="col-8">
              <h4 className="d-flex align-items-center">
                <Link
                  className=" me-2"
                  style={{ fontSize: "14px" }}
                  to={`/listasUsuario/${listasRegalo.LisRegUsuarioId}`}
                >
                  <IoArrowBackSharp style={{ width: "30px", height: "30px" }} />{" "}
                </Link>{" "}
                <FaGift />{" "}
                <span className="ms-2">{listasRegalo.LisRegNombre}</span>
              </h4>

              <h6>
                {formatDate(listasRegalo.LisRegFecCreacion)} -{" "}
                {listasRegalo.LisRegUsuario}{" "}
                {listasRegalo.LisRegUsuarioApellido}
              </h6>

              <h6 className="d-flex align-items-center">
                <RiGitRepositoryPrivateFill />
                <span className="ms-2">{listasRegalo.LisRegLisPriv}</span>
              </h6>
            </div>

            <div className="col-4">
              <h6 className="text-end">Prioridad</h6>
              <div className="d-flex justify-content-end">
                <h6 style={{ fontSize: "13px" }} className="ms-2">
                  <FcLowPriority style={{ width: "25px", height: "25px" }} />{" "}
                  Baja{" "}
                </h6>
                <h6 style={{ fontSize: "13px" }} className="ms-2">
                  <FcMediumPriority style={{ width: "25px", height: "25px" }} />{" "}
                  Media{" "}
                </h6>
                <h6 style={{ fontSize: "13px" }} className="ms-2">
                  <FcHighPriority style={{ width: "25px", height: "25px" }} />{" "}
                  Alta{" "}
                </h6>
              </div>
            </div>
            <div className=" d-flex justify-content-end align-items-center">
              {" "}
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
          </div>
        )}

        <div className="row d-flex mt-4 justify-content-center pb-5">
          {/* Listar articulos de la lista */}

          <div className="col-6">
            {listaArticulos &&
              listaArticulos
                .filter((articulo) => {
                  // Filtrar por prioridad
                  const filtroPrioridad =
                    prioridadFiltro === "Todas" ||
                    articulo.ArtPrioridad === prioridadFiltro;

                  // Retornar true solo si ambas condiciones se cumplen
                  return filtroPrioridad;
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
                              <h6 className="card-title">
                                {articulo.ArtNombre}
                              </h6>
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}
