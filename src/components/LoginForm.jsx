import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("El nombre de usuario debe ser un correo electrónico válido.");
    } else if (username === "daniel.vidal@ravenloop.com" && password === "password") {
      onLogin();
    } else {
      setError("El nombre de usuario o la contraseña son incorrectos.");
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
              {error && <div className="error" style={{color: "red"}}>{error}</div>}
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
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
