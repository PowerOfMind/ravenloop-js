import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "CEO" && password === "password") {
      onLogin();
    } else {
      alert("Acceso denegado");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <form className="card p-4 mt-5" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal text-center">Iniciar sesión</h1>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Nombre de usuario</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
