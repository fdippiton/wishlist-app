import React from "react";
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

export function ListasPublicas() {
  const { userId } = useParams();
  const [listasRegalos, setListasRegalos] = useState();
  const [mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState({
    usuarioNombre: "",
    usuarioApellido: "",
  });

  useEffect(() => {
    // Fetch user-specific data using user.UserId and token
    const fetchUserData = async () => {
      try {
        const usuarioResponse = await fetch(
          `http://localhost:5109/api/usuarios/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (usuarioResponse.ok) {
          const data = await usuarioResponse.json();
          console.log(data);
          setUsuario({
            usuarioNombre: data.usuNombre,
            usuarioApellido: data.usuApellidos,
          });
        }

        const listasRegalosResponse = await fetch(
          `http://localhost:5109/api/listaRegalos/listasUsuario/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (listasRegalosResponse.ok) {
          const data = await listasRegalosResponse.json();

          if (data.length > 0) {
            setListasRegalos(data);
          } else {
            setMensaje(
              `${usuario.usuarioNombre} ${usuario.usuarioApellido} no tiene listas públicas.`
            );
          }

          console.log(data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error in request:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="mt-5">
      <h2 className="mb-5">
        Listas de {usuario.usuarioNombre} {usuario.usuarioApellido}
      </h2>

      {mensaje && <h5>{mensaje}</h5>}
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
                      Creada {formatDateString(listaRegalos.LisRegFecCreacion)}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

function formatDateString(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}
