import React from "react";

function Articulo({ articulo }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{articulo.ArticuloNombre}</h5>
          <p className="card-text">{articulo.ArticuloDescripcion}</p>
        </div>
      </div>
    </div>
  );
}

export default Articulo;
