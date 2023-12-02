import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
        // El artículo se creó con éxito
        console.log("El artículo se creó con éxito");
        // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
        navigate(`/listaDeseos/${listaId}`);
      } else {
        // Ocurrió un error al crear el artículo
        console.error("Error al crear el artículo:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      {/* <div className="row">
        <div className=" pt-3 ">
          {" "}
          <Link
            className="btn me-2 text-decoration-none text-white bg-dark"
            to="/perfilusuario"
            style={{ fontSize: "13px" }}
          >
            Dashboard
          </Link>
        </div>
      </div> */}
      <div className="row d-flex justify-content-center">
        <div className="col-6">
          <h3 className="mt-5 mb-5 text-center">Añadir Artículo</h3>
          <form className="mt-4">
            <div className="mb-3">
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
    </div>
  );
}

export default CrearArticulo;
