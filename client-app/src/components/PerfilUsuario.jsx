export function PerfilUsuario() {
  return (
    <div className="row mt-5">
      <div className="row">
        <h1>Perfil de usuario</h1>
      </div>

      <div className="row">
        {/* Listar listas de regalo */}

        {/* Lista 1 */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Special list</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="/" className="btn btn-primary">
              Ver articulos
            </a>
          </div>
        </div>

        {/* Lista 2 */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Special list</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="/" className="btn btn-primary">
              Ver articulos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
