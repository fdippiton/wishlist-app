import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

function EditarArticulo() {
  //   const { listaId } = useParams();
  const { articuloId } = useParams();
  const { user, authenticated } = useContext(MyContext);
  const [listaArticulos, setlistaArticulos] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ArtId: 0,
    ArtNombre: "",
    ArtUrl: "",
    ArtLisRegId: "",
    ArtPrioridad: "",
    ArtRegEstatusId: 0,
    ArtEstatus: "A",
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

  useEffect(() => {
    console.log(authenticated);
    if (authenticated) {
      // Fetch user-specific data using user.UserId and token
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5109/api/articulos/${articuloId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setlistaArticulos(data);
            console.log(data);

            setFormData({
              ArtId: data.artId,
              ArtNombre: data.artNombre,
              ArtUrl: data.artUrl,
              ArtLisRegId: data.artLisRegId,
              ArtPrioridad: data.artPrioridad,
              ArtRegEstatusId: data.artRegEstatusId,
              ArtEstatus: data.artEstatus,
            });
            console.log(formData);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //   console.log(formData);

      console.log("Request Payload:", JSON.stringify(formData));
      // Realiza la solicitud POST al servidor para editar el artículo

      console.log("articuloId", articuloId, "ArtId", formData.ArtId);
      if (authenticated) {
        const articulosResponse = await fetch(
          `http://localhost:5109/api/articulos/${articuloId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (articulosResponse.ok) {
          console.log("Guardado exitosamente:", articulosResponse);
          navigate(`/listaDeseos/${formData.ArtLisRegId}`);

          console.log("Articulo:", formData);
        } else {
          console.error(
            "Error al guardar el artículo:",
            articulosResponse.status
          );
          if (
            articulosResponse.headers
              .get("content-type")
              .includes("application/json")
          ) {
            const errorData = await articulosResponse.json();
            console.error("Error details:", errorData);
          } else {
            const errorText = await articulosResponse.text();
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
        <h3 className="mt-5 mb-5 text-center">Editar Articulo</h3>
        <form className="mt-4">
          <div className="mb-3">
            {/* <label className="form-label">Nombre del Artículo:</label> */}
            <input
              type="text"
              className="form-control opacity-75"
              name="ArtNombre"
              value={formData.ArtNombre}
              onChange={handleInputChange}
              placeholder={formData.ArtNombre}
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="mb-3">
            {/* <label className="form-label">URL del Artículo:</label> */}
            <input
              type="text"
              className="form-control opacity-75"
              name="ArtUrl"
              value={formData.ArtUrl}
              placeholder={formData.ArtUrl}
              onChange={handleInputChange}
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select opacity-75"
              name="ArtPrioridad"
              value={formData.ArtPrioridad}
              onChange={handleInputChange}
              style={{ fontSize: "13px" }}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="mb-3 text-center mt-3">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
              style={{ fontSize: "13px" }}
            >
              Editar artículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarArticulo;
