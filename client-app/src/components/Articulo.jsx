import React from 'react';

function Articulo({ articulo }) {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{articulo.ArtNombre}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>URL:</strong> {articulo.ArtUrl}
        </p>
        <p className="card-text">
          <strong>URL:</strong> {articulo.LisRegId}
        </p>
        <p className="card-text">
          <strong>Prioridad:</strong> {articulo.ArtPrioridad}
        </p>
        <p className="card-text">
          <strong>Estatus:</strong> {articulo.ArtEstatus}
        </p>
      </div>
    </div>
  );
}

export default Articulo;
