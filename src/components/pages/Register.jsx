import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    names: "",
    password: "",
    confirmPassword: "",
    email: "",
    telefono: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      localStorage.setItem("userData", JSON.stringify(formData));
      MySwal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Registro exitoso'
      }).then(() => {
        navigate('/login');
      });
    }
  };

  const validarFormulario = () => {
    let esValido = true;
    let newErrors = {};

    if (formData.username.length > 12) {
      newErrors.username = "El nombre de usuario no debe exceder 12 caracteres.";
      esValido = false;
    }

    if (!/^[A-Za-z\s]+$/.test(formData.names)) {
      newErrors.names = "Solo se permiten letras y espacios.";
      esValido = false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 12 caracteres, incluyendo letras, números y caracteres especiales.";
      esValido = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
      esValido = false;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = "Correo electrónico no válido.";
      esValido = false;
    }

    if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos.";
      esValido = false;
    }

    setErrors(newErrors);
    return esValido;
  };

  return (
    <main>
      <header>
        <ul>
          <li>
            <NavLink className={"text-white bold-text"} to={"/login"}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className={"text-white bold-text"} to={"/"}>
              Regresar
            </NavLink>
          </li>
        </ul>
      </header>
      <div className="form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>
            <div className="input-field">
              <label htmlFor="">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                onChange={handleChange}
                value={formData.username}
              />
                {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="">Nombres y Apellidos</label>
              <input
                type="text"
                name="names"
                id="names"
                required
                onChange={handleChange}
                value={formData.names}
              />
                {errors.names && <p className="error-message">{errors.names}</p>}
              
            </div>
            <div className="input-field">
                <label htmlFor="">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>

              <div className="input-field">
                <label htmlFor="">Confirmar contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
              </div>

              <div className="input-field">
                <label htmlFor="">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="input-field">
                <label htmlFor="">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  id="telefono"
                  required
                  onChange={handleChange}
                  value={formData.telefono}
                />
                {errors.telefono && <p className="error-message">{errors.telefono}</p>}
              </div>

            <div className="btn-container">
              <button>Registrate</button>
            </div>
          </form>

          Ya tienes una cuenta?<NavLink to={"/login"}>Inica Sesion!</NavLink>
        </div>
      </div>
    </main>
  );
};

export default Register;
