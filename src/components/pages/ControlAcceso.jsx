import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ControlAcceso = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(signedIn);
  }, []);

  const handleChange = (e) => {
    setCodigo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Intentar recuperar los datos de residencia del localStorage
    let residenciasData = localStorage.getItem("residenciaData");
    if (residenciasData) {
      try {
        residenciasData = JSON.parse(residenciasData);

        // Asegurarse de que los datos sean un arreglo
        if (!Array.isArray(residenciasData)) {
          throw new Error("Formato de datos no válido");
        }

        const residenciaEncontrada = residenciasData.find(residencia => residencia.accessCode === codigo);

        if (residenciaEncontrada) {
          Swal.fire({
            title: 'Acceso Permitido',
            text: `Extras: ${residenciaEncontrada.extras || 'N/A'}`,
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Acceso Denegado',
            text: 'Código de acceso inválido.',
            icon: 'error'
          });
        }
      } catch (error) {
        console.error("Error al procesar los datos de residencia:", error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al procesar los datos de residencia.',
          icon: 'error'
        });
      }
    } else {
      Swal.fire({
        title: 'Datos no disponibles',
        text: 'No hay datos de residencias registradas.',
        icon: 'info'
      });
    }
  };
  

  return (
    <main>
      <header>
        <ul>
          <li><NavLink to={"/"} className={"bold-text text-white"}>Inicio</NavLink></li>
          {isSignedIn ? (
            <>
              <li><NavLink to={"/registrodatos"} className={"bold-text text-white"}>Registrar Datos</NavLink></li>
              <li><NavLink to={"/consultarecidentes"} className={"bold-text text-white"}>Consultar Datos</NavLink></li>
              <li><NavLink to={"/login"} className={"bold-text text-white"} onClick={() => localStorage.removeItem("isSignedIn")}>Cerrar Sesión</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to={"/register"} className={"bold-text text-white"}>Registrarse</NavLink></li>
              <li><NavLink to={"/login"} className={"bold-text text-white"}>Iniciar Sesión</NavLink></li>
            </>
          )}
        </ul>
      </header>
      <div className="form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <h1>Control de acceso a la residencia</h1>
            <div className="input-field">
              <label htmlFor="codigo">Código de Acceso:</label>
              <input
                type="text"
                name="codigo"
                id="codigo"
                required
                onChange={handleChange}
                value={codigo}
              />
            </div>
            <div className="btn-container">
              <button type="submit">Acceder</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ControlAcceso;

