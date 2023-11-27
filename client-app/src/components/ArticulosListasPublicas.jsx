import { MyContext } from "../App";
import React, { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
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
import { IoArrowBackSharp } from "react-icons/io5";

export function ArticulosListasPublicas() {
  const [listasRegalo, setListasRegalo] = useState(null);
  const [listaArticulos, setlistaArticulos] = useState(null);
  const { user, authenticated, handleLogout } = useContext(MyContext);
  const navigate = useNavigate();

  // Obtener listaId de los parámetros de la ruta
  const { listaRegId } = useParams();

  useEffect(() => {
    // Fetch user-specific data using user.UserId and token
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

        // Fetch data from Articulos API
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

  return (
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
              <h6 style={{ fontSize: "13px" }} className="me-2">
                <FcHighPriority style={{ width: "25px", height: "25px" }} />{" "}
                Alta{" "}
              </h6>
            </div>
          </div>
        </div>
      )}

      <div className="row d-flex mt-4 justify-content-center pb-5">
        {/* Listar articulos de la lista */}

        <div className="col-6">
          {listaArticulos &&
            listaArticulos.map((articulo) => (
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
                        <h6 className="card-text" style={{ fontSize: "13px" }}>
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
  );
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}