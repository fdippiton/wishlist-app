import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

function RditarListaRegalos() {
  //   const { listaId } = useParams();
  const { listaRegId } = useParams();
  const { user, authenticated } = useContext(MyContext);
  const [ListaRegalo, setListaRegalo] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    LisRegId: 0,
    LisRegNombre: "",
    LisRegFecCreacion: "",
    LisRegUsuarioId: "",
    LisRegLisPrivId: "",
    LisRegEstatus: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login if not authenticated
      navigate("/signin");
    }
  }, [authenticated, navigate]);

  const [privacidadDropdown, setprivacidadDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "http://localhost:5109/api/listaPrivacidad"
        );
        const listaPrivacidadResponse = await response1.json();

        setprivacidadDropdown(listaPrivacidadResponse);
        console.log(listaPrivacidadResponse);

        if (authenticated) {
          // Fetch user-specific data using user.UserId and token
          try {
            const response2 = await fetch(
              `http://localhost:5109/api/listaRegalos/ById/${listaRegId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            );

            if (response2.ok) {
              const data = await response2.json();
              setListaRegalo(data);
              console.log(data);

              setFormData({
                LisRegId: data.LisRegId,
                LisRegNombre: data.LisRegNombre,
                LisRegFecCreacion: data.LisRegFecCreacion,
                LisRegUsuarioId: data.LisRegUsuarioId,
                LisRegLisPrivId: data.LisRegLisPrivId,
                LisRegEstatus: data.LisRegEstatus,
              });
              console.log(formData);
            } else {
              console.error("Error fetching user data");
            }
          } catch (error) {
            console.error("Error in request:", error);
          }
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [authenticated, listaRegId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //   console.log(formData);

      console.log("Request Payload:", JSON.stringify(formData));
      // Realiza la solicitud POST al servidor para editar el artículo

      if (authenticated) {
        const listaResponse = await fetch(
          `http://localhost:5109/api/listaRegalos/${listaRegId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (listaResponse.ok) {
          console.log("Guardado exitosamente:", listaResponse);
          navigate(`/perfilUsuario`);

          console.log("Lista:", formData);
        } else {
          console.error("Error al guardar la lista:", listaResponse.status);
          if (
            listaResponse.headers
              .get("content-type")
              .includes("application/json")
          ) {
            const errorData = await listaResponse.json();
            console.error("Error details:", errorData);
          } else {
            const errorText = await listaResponse.text();
            console.error("Non-JSON response:", errorText);
          }
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Puedes manejar errores o mostrar un mensaje de error aquí
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-6">
        <h3 className="mt-5 mb-5 text-center">Editar lista de deseos</h3>
        <form className="mt-4">
          <div className="mb-3">
            {/* <label className="form-label">Nombre del Artículo:</label> */}
            <input
              type="text"
              className="form-control opacity-75"
              name="LisRegNombre"
              value={formData.LisRegNombre}
              onChange={handleInputChange}
              placeholder={formData.LisRegNombre}
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select opacity-75"
              name="LisRegLisPrivId"
              value={formData.LisRegLisPrivId}
              onChange={handleInputChange}
              style={{ fontSize: "13px" }}
            >
              {privacidadDropdown.map((opcion) => (
                <option
                  className="text-black"
                  key={opcion.lisPrivId}
                  value={opcion.lisPrivId}
                >
                  {opcion.lisPrivPrivacidad}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 text-center mt-3">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
              style={{ fontSize: "13px" }}
            >
              Editar lista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RditarListaRegalos;
