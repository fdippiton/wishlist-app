import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

export function UserAccount() {
  const [usuario, setUsuario] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const { user, authenticated, handleLogout } = useContext(MyContext);
  const { usuarioId } = useParams();

  const [formDataUsuario, setFormDataUsuario] = useState({
    usuNombre: "",
    usuApellidos: "",
    usuCorreo: "",
    usuContrasena: "",
    usuProfilePhoto: null,
    usuEstatus: "",
  });

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login if not authenticated
      navigate("/signin");
    }
  }, [authenticated, navigate]);

  const fetchUserData = async () => {
    try {
      let url = `http://localhost:5109/api/usuarios/${usuarioId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsuario(data);
        setFormDataUsuario(data);
        console.log(data);
      } else {
        console.error("Error fetching admin data");
      }
    } catch (error) {
      console.error("Error in request:", error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchUserData();
    }
  }, [user, authenticated]);

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(formDataUsuario).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("usuProfilePhoto", profileImage);

      console.log(formData);

      let url = `http://localhost:5109/api/usuarios/modificarUsuario/${usuarioId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("User updated successfully");
        // Fetch user data again to update the profile photo
        fetchUserData();
      } else {
        if (response.status === 401) {
          console.error("Unauthorized - check token validity");
        } else {
          const errorText = await response.text();
          console.error(
            `Error updating user: ${response.status} - ${errorText}`
          );
        }
      }
    } catch (error) {
      console.error("Error in request:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDataUsuario({ ...formDataUsuario, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div className="container mt-3 mb-5">
      <div className="row">
        <div className="col-12">
          <h3>Perfil</h3>
          <h5>
            {usuario.usuNombre} {usuario.usuApellidos}
          </h5>
          <form>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">
                {/* Imagen de Perfil Actual */}
              </label>
              {usuario.usuProfilePhoto && (
                <img
                  src={`data:image/png;base64, ${usuario.usuProfilePhoto}`}
                  alt="Perfil Actual"
                  className="img-fluid mb-3 rounded-circle me-3"
                  style={{ width: "55px", height: "55px" }}
                />
              )}
              <label
                htmlFor="profileImage"
                className="form-label fw-bolder"
                style={{ fontSize: "13px" }}
              >
                {" "}
                Cambiar foto de perfil
              </label>
              <input
                type="file"
                className="form-control"
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
                style={{ fontSize: "13px" }}
              />
            </div>

            <div className="mb-3"></div>

            <div className="mb-3">
              <label
                htmlFor="usuNombre"
                className="form-label fw-bolder"
                style={{ fontSize: "13px" }}
              >
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="usuNombre"
                name="usuNombre"
                value={formDataUsuario.usuNombre}
                onChange={handleChange}
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="usuApellidos"
                className="form-label fw-bolder"
                style={{ fontSize: "13px" }}
              >
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                id="usuApellidos"
                name="usuApellidos"
                value={formDataUsuario.usuApellidos}
                onChange={handleChange}
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="usuCorreo"
                className="form-label fw-bolder"
                style={{ fontSize: "13px" }}
              >
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="usuCorreo"
                name="usuCorreo"
                value={formDataUsuario.usuCorreo}
                onChange={handleChange}
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="usuContrasena"
                className="form-label fw-bolder"
                style={{ fontSize: "13px" }}
              >
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="usuContrasena"
                name="usuContrasena"
                value={formDataUsuario.usuContrasena}
                onChange={handleChange}
                style={{ fontSize: "13px" }}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary bg-dark"
              onClick={handleUpdateUser}
              style={{ fontSize: "13px" }}
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
