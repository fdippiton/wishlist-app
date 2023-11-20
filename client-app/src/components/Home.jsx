import gift from "../undraw_gift_box.svg";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { MyContext } from "../App";

export function Home() {
  const { authenticated } = useContext(MyContext);

  const styles = {
    width: "400px",
    height: "400px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 d-flex flex-column justify-content-center">
          <h1>Encuentra el regalo perfecto para tus seres queridos!</h1>
          <h4 className="mb-4">
            Crea una lista de deseos y compartela con tus familiares y amigos.
          </h4>
          {/* <button type="submit" class="btn btn-primary" style={{ width: '200px' }}>Crear</button>*/}
          {authenticated ? (
            <Link
              className="text-dark text-decoration-none"
              to="/perfilUsuario"
            >
              <b
                className="btn btn-outline-primary"
                style={{ "font-size": "13px" }}
              >
                Crear lista
              </b>
            </Link>
          ) : (
            <Link className="text-dark text-decoration-none" to="/signup">
              <b
                className="btn btn-outline-primary"
                style={{ "font-size": "13px" }}
              >
                Crear lista
              </b>
            </Link>
          )}
        </div>
        <div className="col-6 text-center">
          <img src={gift} className="" style={styles} alt="regalo" />
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-5">
        <div className="col-6">
          {/* <h6 for="exampleInputPassword1" class="form-label">
            Inserta el nombre de tu allegado para buscar una lista
          </h6> */}
          <form className="text-center">
            <div className="row">
              <div className="col-10">
                <input
                  type="password"
                  className="form-control"
                  style={{ border: "1px solid #9b9b9b", "font-size": "14px" }}
                  id="exampleInputPassword1"
                  placeholder="Inserte el nombre de su allegado para buscar una lista"
                />
              </div>
              <div className="col-2  d-flex align-items-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ "font-size": "14px" }}
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
