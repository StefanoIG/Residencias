import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const showToast = (text, icon) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: icon,
      title: text
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem("userData");
    
    if (storedData) {
      const { email, password } = JSON.parse(storedData);
      if (email === formData.email && password === formData.password) {
        localStorage.setItem("isSignedIn", "true"); // Establecer que el usuario está logueado
        showToast("Inicio de sesión exitoso", "success");
        navigate("/");
      } else {
        showToast("Credenciales incorrectas", "error");
      }
    } else {
      showToast("No hay datos almacenados", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main>
      <header>
        <ul>
          <li><NavLink className={"text-white bold-text"} to={"/"}>Inicio</NavLink></li>
          <li><NavLink className={"text-white bold-text"} to={"/register"}>Registrarse</NavLink></li>
        </ul>
      </header>
      <div className="form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <div className="input-field">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="btn-container">
              <button type="submit">Iniciar Sesión</button>
            </div>
          </form>
          No tienes una cuenta? <NavLink to={"/register"}>Regístrate ahora!</NavLink>
        </div>
      </div>
    </main>
  );
};

export default Login;
