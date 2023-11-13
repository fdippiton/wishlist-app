export function ListaRegalos() {
  return (
    <div className="row mt-5">
      <div className="row">
        <h1>Nombre de la lista de regalos</h1>
      </div>

      <div className="row">
        {/* Listar articulos de la lista */}

        {/* Lista 1 */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Nombre del articulo</h5>
            <p className="card-text">Prioridad</p>
            <p className="card-text">Status del articulo</p>
            <a href="/" className="btn btn-primary">
              Link al articulo
            </a>
          </div>
        </div>

        {/* Lista 2 */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Nombre del articulo</h5>
            <p className="card-text">Prioridad</p>
            <p className="card-text">Status del articulo</p>
            <a href="/" className="btn btn-primary">
              Link al articulo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
