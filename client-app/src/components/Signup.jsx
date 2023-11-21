import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();

  const [registrationData, setRegistrationData] = useState({
    UsuNombre: "",
    UsuApellidos: "",
    UsuCorreo: "",
    UsuContrasena: "",
    UsuRol: 2,
    UsuEstatus: "A",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5109/api/Usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        console.log("Usuario registrado exitosamente");
        navigate("/Signin");
        // Maneja la respuesta del servidor (puede redirigir al usuario o mostrar un mensaje de éxito)
      } else {
        console.error("Error al registrar usuario");
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
          Regístrate ahora y comienza a crear tus listas de deseos
        </h6>
        <form className="mt-5">
          <div>
            <div className="d-flex justify-content-start">
              <label
                className="form-label"
                id="formName"
                style={{ "font-size": "13px" }}
              >
                Nombre
              </label>
            </div>
            <input
              className="form-control form-control-sm opacity-75"
              placeholder="Melek"
              type="text"
              name="UsuNombre"
              value={registrationData.UsuNombre}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="d-flex justify-content-start mt-3">
              <label
                className="form-label"
                id="formLastname"
                style={{ "font-size": "13px" }}
              >
                Apellido
              </label>
            </div>
            <input
              className="form-control form-control-sm opacity-75"
              placeholder="Olsen"
              type="text"
              name="UsuApellidos"
              value={registrationData.UsuApellidos}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="d-flex justify-content-start mt-3">
              <label
                className="form-label"
                id="formEmail"
                style={{ "font-size": "13px" }}
              >
                Email
              </label>
            </div>
            <input
              className="form-control form-control-sm opacity-75"
              placeholder="Melek@example.com"
              type="email"
              name="UsuCorreo"
              value={registrationData.Correo}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="d-flex justify-content-start mt-3">
              <label
                className="form-label"
                id="formPassword"
                style={{ "font-size": "13px" }}
              >
                Contrase&ntilde;a
              </label>
            </div>
            <input
              className="form-control form-control-sm opacity-75"
              placeholder="2h343hsdjH"
              type="password"
              name="UsuContrasena"
              value={registrationData.UsuContrasena}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-grid gap-2 col-12 mx-auto mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRegister}
              style={{ "font-size": "14px" }}
            >
              Registrarse
            </button>
          </div>

          <div
            className="d-flex justify-content-center mt-3"
            style={{ "font-size": "13px" }}
          >
            <span>&iquest;No tienes una cuenta?&nbsp; </span>{" "}
            <Link className="text-dark text-decoration-none" to="/signin">
              <b className="text-primary"> Iniciar sesi&oacute;n</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
