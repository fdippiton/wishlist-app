import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function CrearListaRegalos() {
  const navigate = useNavigate();
  const { usuarioId } = useParams();

  const [formData, setFormData] = useState({
    LisRegNombre: "",
    LisRegFecCreacion: "",
    LisRegUsuarioId: parseInt(usuarioId, 10), // Debes proporcionar el usuario correcto
    LisRegLisPrivId: 0, // Debes proporcionar el ID correcto
    LisRegEstatus: "A",
  });

  const [privacidadDropdown, setprivacidadDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listaPrivacidadResponse] = await Promise.all([
          fetch("http://localhost:5109/api/" + "listaPrivacidad").then(
            (response) => response.json()
          ),
        ]);

        setprivacidadDropdown(listaPrivacidadResponse);

        const fechaActual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
        setFormData({
          ...formData,
          LisRegFecCreacion: fechaActual,
        });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5109/api/listaRegalos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Guardado exitosamente:", response);
        navigate(`/perfilUsuario`);
        console.log(formData);
      } else {
        // Manejar otros códigos de estado según tus necesidades
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-6">
        <h2>Crear Lista de Deseos</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre de la Lista:</label>
            <input
              className="form-control"
              type="text"
              name="LisRegNombre"
              value={formData.LisRegNombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Selecciona privacidad</label>
            <select
              className="form-control"
              name="LisRegLisPrivId"
              value={formData.LisRegLisPrivId}
              onChange={handleInputChange}
            >
              <option value="">Selecciona...</option>
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
          <div>
            <button className="btn btn-primary" type="submit">
              Crear Lista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
