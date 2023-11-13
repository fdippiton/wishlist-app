import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export function CrearListaRegalos() {
  const [formData, setFormData] = useState({
    LisRegNombre: '',
    LisRegFecCreacion: '',
    LisRegUsuarioId: 6, // Debes proporcionar el usuario correcto
    LisRegLisPrivId: 0, // Debes proporcionar el ID correcto
    LisRegEstatus: 'A',
  });

  const [privacidadDropdown, setprivacidadDropdown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listaPrivacidadResponse] = await Promise.all([
          fetch(process.env.WISHLIST_API + 'listaPrivacidad').then((response) =>
            response.json()
          ),
        ]);

        setprivacidadDropdown(listaPrivacidadResponse);

        /*console.log("Lista de Privacidad:", listaPrivacidadResponse);*/
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setFormData({
      ...formData,
      LisRegFecCreacion: fechaActual,
    });

    fetchData();
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(process.env.WISHLIST_API + 'listaRegalos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LisRegNombre: formData.LisRegNombre,
          LisRegFecCreacion: formData.LisRegFecCreacion,
          LisRegUsuarioId: formData.LisRegUsuarioId,
          LisRegLisPrivId: formData.LisRegLisPrivId,
          LisRegEstatus: formData.LisRegEstatus,
        }),
      });

      if (response.ok) {
        console.log('Guardado exitosamente:', response);
      } else {
        // Manejar otros códigos de estado según tus necesidades
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
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
              {/*<option value="">Selecciona...</option>*/}
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
