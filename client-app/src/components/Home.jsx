import gift from '../undraw_gift_box.svg';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { MyContext } from '../App';

export function Home() {
  const { authenticated } = useContext(MyContext);

  const styles = {
    width: '400px',
    height: '400px',
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 d-flex flex-column justify-content-center">
          <h1>Encuentra el regalo perfecto para tus seres queridos!</h1>
          <h4>
            Crea una lista de deseos y compartela con tus familiares y amigos.
          </h4>
          {/* <button type="submit" class="btn btn-primary" style={{ width: '200px' }}>Crear</button>*/}
          {authenticated ? (
            <Link
              className="text-dark text-decoration-none"
              to="/PerfilUsuario"
            >
              <b className="btn btn-outline-primary">Crear lista</b>
            </Link>
          ) : (
            <Link className="text-dark text-decoration-none" to="/signup">
              <b className="btn btn-outline-primary">Crear lista</b>
            </Link>
          )}
        </div>
        <div className="col-6 text-center">
          <img src={gift} className="" style={styles} alt="regalo" />
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-5">
        <div className="col-6">
          <form className="text-center">
            <h6>Inserta codigo de lista o usuario para buscar una lista</h6>
            <div className="mb-3">
              {/*<label for="exampleInputPassword1" class="form-label">Inserta codigo de lista o usuario</label>*/}
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="1233212 o Isak34"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
