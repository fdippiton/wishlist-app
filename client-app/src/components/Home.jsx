import gift from "../undraw_gift_box.svg";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

export function Home() {
  const { user, authenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const [listaUsuarios, setListaUsuarios] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const styles = {
    width: "400px",
    height: "400px",
  };

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    try {
      const response = await fetch(
        `http://localhost:5109/api/usuarios?searchQuery=${event.target.value}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  // useEffect(() => {
  //   // Fetch user-specific data using user.UserId and token
  //   const fetchUserData = async () => {
  //     try {
  //       const listaUsuariosResponse = await fetch(
  //         `http://localhost:5109/api/usuarios`,
  //         {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );

  //       if (listaUsuariosResponse.ok) {
  //         const data = await listaUsuariosResponse.json();
  //         setListaUsuarios(data);

  //         console.log(data);
  //       } else {
  //         console.error("Error fetching user data");
  //       }
  //     } catch (error) {
  //       console.error("Error in request:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 d-flex flex-column justify-content-center">
          <h1>Encuentra el regalo perfecto para tus seres queridos!</h1>
          <h4 className="mb-4">
            Crea listas de deseos y compartelas con tus familiares y amigos.
          </h4>
          {/* <button type="submit" class="btn btn-primary" style={{ width: '200px' }}>Crear</button>*/}
          {authenticated &&
          user[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "2" ? (
            <Link
              className="text-dark text-decoration-none"
              to="/perfilUsuario"
            >
              <b className="btn btn-outline-dark" style={{ fontSize: "13px" }}>
                Crear lista
              </b>
            </Link>
          ) : (
            <Link className="text-dark text-decoration-none" to="/perfilAdmin">
              <b className="btn btn-outline-dark" style={{ fontSize: "13px" }}>
                Crear lista
              </b>
            </Link>
          )}
        </div>
        <div className="col-6 text-center">
          <img src={gift} className="" style={styles} alt="regalo" />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#e5e5f7",
          opacity: "1",
          backgroundImage:
            "radial-gradient(#787efd 1.7000000000000002px, #e5e5f7 1.7000000000000002px)",
          backgroundSize: "34px 34px",
          height: "100px",
          width: "100%",
        }}
      ></div>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-6">
          <form className="text-center" onSubmit={handleSearch}>
            <div className="row">
              <div className="col-10">
                <input
                  type="text" // Adjust the type based on your requirements
                  className="form-control"
                  style={{ border: "1px solid #9b9b9b", fontSize: "14px" }}
                  placeholder="Inserte el nombre de su allegado para buscar una lista"
                  value={searchQuery}
                  onChange={handleSearch} // Attach the onChange handler to the input field
                />
              </div>
              {searchResults.length > 0 ? (
                <div className="mt-3">
                  <ul className="list-unstyled text-start">
                    {searchResults.map((user) => (
                      <li
                        key={user.UsuId}
                        className=""
                        style={{ fontSize: "13px" }}
                      >
                        <Link
                          to={`/listasUsuario/${user.UsuId}`}
                          className="text-decoration-none"
                        >
                          {user.UsuNombre} {user.UsuApellidos}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
