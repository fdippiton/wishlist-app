import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

function EditarArticulo() {
  const { articuloId } = useParams();
  const { user, authenticated } = useContext(MyContext);
  const [listaArticulos, setlistaArticulos] = useState();
  const navigate = useNavigate();
  const [estatusRegaloDropdown, seestatusRegaloDropdown] = useState([]);

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
      navigate("/signin"); // Redirect to login if not authenticated
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    console.log(authenticated);
    if (authenticated) {
      const fetchUserData = async () => {
        try {
          const response1 = await fetch(
            "http://localhost:5109/api/regaloEstatus"
          );
          const estatusRegalodResponse = await response1.json();

          seestatusRegaloDropdown(estatusRegalodResponse);
          console.log(estatusRegalodResponse);

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
      console.log("Request Payload:", JSON.stringify(formData));
      console.log("articuloId", articuloId, "ArtId", formData.ArtId);

      // Realiza la solicitud PUT al servidor para editar el artículo
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
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-6">
        <h3 className="mt-5 mb-5 text-center">Editar Articulo</h3>
        <form className="mt-4">
          <div className="mb-3">
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

          <div className="mb-3">
            <select
              className="form-select opacity-75"
              name="ArtRegEstatusId"
              value={formData.ArtRegEstatusId}
              onChange={handleInputChange}
              style={{ fontSize: "13px" }}
            >
              {estatusRegaloDropdown.map((opcion) => (
                <option
                  className="text-black"
                  key={opcion.regEstatusId}
                  value={opcion.regEstatusId}
                >
                  {opcion.regEstatus}
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
              Editar artículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarArticulo;
