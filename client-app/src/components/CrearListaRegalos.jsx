import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

export function CrearListaRegalos() {
  const navigate = useNavigate();
  const { usuarioId } = useParams();

  const [formData, setFormData] = useState({
    LisRegNombre: "",
    LisRegFecCreacion: "",
    LisRegUsuarioId: parseInt(usuarioId, 10),
    LisRegLisPrivId: 0,
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
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="row d-flex  justify-content-center">
      {/* <div className="row">
        <div className=" pt-3">
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
          <h3 className="mt-5 mb-5 text-center">Crear Lista de Deseos</h3>
          <form className="text-center" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control opacity-75"
                type="text"
                placeholder="Nombre de la Lista"
                name="LisRegNombre"
                value={formData.LisRegNombre}
                onChange={handleInputChange}
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control opacity-75"
                name="LisRegLisPrivId"
                value={formData.LisRegLisPrivId}
                onChange={handleInputChange}
                style={{ fontSize: "13px" }}
              >
                <option value="">-- Privacidad --</option>
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
                className="btn btn-dark"
                type="submit"
                style={{ fontSize: "13px" }}
              >
                Crear lista
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
