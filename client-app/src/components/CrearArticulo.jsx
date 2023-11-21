import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CrearArticulo() {
  const { listaId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ArtNombre: "",
    ArtUrl: "",
    ArtLisRegId: listaId,
    ArtPrioridad: "",
    ArtRegEstatusId: 2,
    ArtEstatus: "A",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Datos del formulario
    // const data = {
    //   ArtNombre: formData.ArtNombre,
    //   ArtUrl: formData.ArtUrl,
    //   ArtLisRegId: listaId,
    //   ArtPrioridad: formData.ArtPrioridad,
    //   ArtRegEstatusId: 2,
    //   ArtEstatus: "A",
    // };

    console.log(formData);

    try {
      // Realiza la solicitud POST al servidor para crear el artículo
      const response = await fetch("http://localhost:5109/api/Articulos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("El artículo se creó con éxito");
        navigate(`/listaDeseos/${listaId}`);
        // El artículo se creó con éxito
        // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
      } else {
        // Ocurrió un error al crear el artículo
        // Puedes manejar errores o mostrar un mensaje de error aquí
        console.error("Error al crear el artículo:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Puedes manejar errores o mostrar un mensaje de error aquí
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-6">
        <h3 className="mt-5 mb-5 text-center">Añadir Artículo</h3>
        <form className="mt-4">
          <div className="mb-3">
            {/* <label className="form-label">Nombre del Artículo:</label> */}
            <input
              type="text"
              className="form-control opacity-75"
              name="ArtNombre"
              value={formData.ArtNombre}
              onChange={handleInputChange}
              placeholder="Nombre del Artículo"
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
              placeholder="URL del Artículo"
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
              <option>-- Prioridad --</option>
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
              Añadir artículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearArticulo;
