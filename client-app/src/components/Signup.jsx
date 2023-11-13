import { Link } from 'react-router-dom';

export function Signup() {
  return (
    <div className="row mt-5">
      <div className="col-4 offset-4">
        <h1 className="text-center">Registrarse</h1>
        <form className="mt-5">
          <div>
            <div className="d-flex justify-content-start">
              <label className="form-label" id="formName">
                Nombre
              </label>
            </div>
            <input
              className="form-control form-control-sm"
              placeholder="Melek"
              type="text"
              id="formName"
              name="formName"
            />
          </div>

          <div>
            <div className="d-flex justify-content-start mt-3">
              <label className="form-label" id="formLastname">
                Apellido
              </label>
            </div>
            <input
              className="form-control form-control-sm"
              placeholder="Olsen"
              type="text"
              id="formLastname"
              name="formLastname"
            />
          </div>

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
              Registrarse
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <span>&iquest;No tienes una cuenta?&nbsp; </span>{' '}
            <Link className="text-dark text-decoration-none" to="/signin">
              <b className="text-primary"> Iniciar sesi&oacute;n</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
