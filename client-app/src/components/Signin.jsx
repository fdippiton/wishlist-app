import { Link } from 'react-router-dom';

export function Signin() {
  return (
    <div className="row mt-5">
      <div className="col-4 offset-4">
        <h1 className="text-center">Iniciar sesi&oacute;n</h1>
        <form className="mt-5">
          <div>
            <div className="d-flex justify-content-start mt-3">
              <label className="form-label" id="formEmail">
                Email
              </label>
            </div>
            <input
              className="form-control form-control-sm"
              placeholder="Melek@example.com"
              type="email"
              id="formEmail"
              name="formEmail"
            />
          </div>

          <div>
            <div className="d-flex justify-content-start mt-3">
              <label className="form-label" id="formPassword">
                Contrase&ntilde;a
              </label>
            </div>
            <input
              className="form-control form-control-sm"
              placeholder="2h343hsdjH"
              type="password"
              id="formPassword"
              name="formPassword"
            />
          </div>

          <div className="d-grid gap-2 col-12 mx-auto mt-4">
            <button type="button" className="btn btn-primary">
              Iniciar sesi&oacute;n
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <span>&iquest;No tienes una cuenta?&nbsp; </span>{' '}
            <Link className="text-dark text-decoration-none" to="/signup">
              <b className="text-primary"> Registrate</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
