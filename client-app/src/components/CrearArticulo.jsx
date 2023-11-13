import React, { useState } from 'react';

function CrearArticulo() {
  const [formData, setFormData] = useState({
    ArtNombre: '',
    ArtUrl: '',
    ArtPrioridad: '',
    ArtEstatus: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Datos del formulario
    const data = {
      ArtNombre: formData.ArtNombre,
      ArtUrl: formData.ArtUrl,
      ArtPrioridad: formData.ArtPrioridad,
      ArtEstatus: formData.ArtEstatus,
    };

    // Realiza la solicitud POST al servidor para crear el artículo
    fetch('/api/articulos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // El artículo se creó con éxito
          // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
        } else {
          // Ocurrió un error al crear el artículo
          // Puedes manejar errores o mostrar un mensaje de error aquí
        }
      })
      .catch((error) => {
        console.error('Error al enviar los datos:', error);
        // Puedes manejar errores o mostrar un mensaje de error aquí
      });
  };

  return (
    <div>
      <h2>Crear Artículo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Artículo:</label>
          <input
            type="text"
            name="ArtNombre"
            value={formData.ArtNombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>URL del Artículo:</label>
          <input
            type="text"
            name="ArtUrl"
            value={formData.ArtUrl}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Prioridad del Artículo:</label>
          <input
            type="text"
            name="ArtPrioridad"
            value={formData.ArtPrioridad}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Estatus del Artículo:</label>
          <input
            type="text"
            name="ArtEstatus"
            value={formData.ArtEstatus}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Crear Artículo</button>
        </div>
      </form>
    </div>
  );
}

export default CrearArticulo;
