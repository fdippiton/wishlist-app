import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MyContext } from "../App";

const Signin = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(MyContext);

  const [loginData, setLoginData] = useState({
    UsuCorreo: "",
    UsuContrasena: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:5109/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const token = await response.text();

        console.log("Inicio de sesión exitoso. Token:", token);
        handleLogin(token); // Almacena el token en localStorage

        const decoded = jwtDecode(token);
        if (
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "1"
        ) {
          navigate("/perfilAdmin");
        } else {
          navigate("/perfilUsuario");
        }
        // Llama a la función proporcionada para manejar el inicio de sesión en el componente padre
      } else {
        console.error("Error al iniciar sesión");
        // Maneja los errores del servidor
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-4 offset-4">
        <h1 className="text-center">Wishlist</h1>
        <h6 className="text-center">
          Inicia sesion ahora para acceder a tus listas de deseos
        </h6>
        <form className="mt-5">
          <div>
            <div className="d-flex justify-content-start mt-3">
              <label
                className="form-label"
                id="formEmail"
                style={{ fontSize: "13px" }}
              >
                Email
              </label>
            </div>
            <input
              className="form-control form-control-sm opacity-75"
              placeholder="Melek@example.com"
              type="email"
              name="UsuCorreo"
              value={loginData.UsuCorreo}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="d-flex justify-content-start mt-3">
              <label
                className="form-label"
                id="formPassword"
                style={{ fontSize: "13px" }}
              >
                Contrase&ntilde;a
              </label>
            </div>
            <input
              className="form-control form-control-sm opacity-75"
              placeholder="2h343hsdjH"
              type="password"
              name="UsuContrasena"
              value={loginData.UsuContrasena}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-grid gap-2 col-12 mx-auto mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLoginButtonClick}
              style={{ fontSize: "14px" }}
            >
              Iniciar sesi&oacute;n
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <span style={{ fontSize: "13px" }}>
              &iquest;No tienes una cuenta?&nbsp;{" "}
            </span>{" "}
            <Link
              className="text-dark text-decoration-none"
              to="/signup"
              style={{ fontSize: "13px" }}
            >
              <b className="text-primary"> Registrate</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
