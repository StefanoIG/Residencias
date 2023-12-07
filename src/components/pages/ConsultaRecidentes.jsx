import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const ConsultaRecidentes = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [residenciasRegistradas, setResidenciasRegistradas] = useState([]);

  useEffect(() => {
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(signedIn);

    const storedData = localStorage.getItem("residenciaData");
    if (storedData) {
      const residenciasData = JSON.parse(storedData);
      if (Array.isArray(residenciasData)) {
        setResidenciasRegistradas(residenciasData);
      } else {
        console.error("Los datos de residencia no están en el formato esperado (debe ser un arreglo).");
      }
    }
  }, []);

  const solicitarResidencia = (residencia) => {
    Swal.fire({
      title: `¿Quieres solicitar la residencia "${residencia.nombreResidencia}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, solicitar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Solicitud enviada',
          'Tu solicitud para la residencia ha sido enviada. Recibirás una respuesta pronto.',
          'success'
        );
        // Implementar lógica adicional para la solicitud
      }
    });
  };

  return (
    <main>
    <header>
      <ul>
        <li><NavLink to={"/"} className={"bold-text text-white"}>Inicio</NavLink></li>
        {isSignedIn ? (
          <>
            <li><NavLink to={"/controlacceso"} className={"bold-text text-white"}>Codigo Acceso</NavLink></li>
            <li><NavLink to={"/login"} className={"bold-text text-white"} onClick={() => localStorage.removeItem("isSignedIn")}>Cerrar Sesión</NavLink></li>
            </>
            ) : (
          <>
            <li><NavLink to={"/register"} className={"bold-text text-white"}>Registrarse</NavLink></li>
            <li><NavLink to={"/login"} className={"bold-text text-white"}>Iniciar Sesión</NavLink></li>
          </>
        )}
        {/* Codigo extras */}
      </ul>
    </header>
    <div className="form-container">
        <div className="form-card">
          <h1>Consulta de las residencia ULEAM</h1>
          <div>
            {residenciasRegistradas.map((residencia, index) => (
              <div key={index} onClick={() => solicitarResidencia(residencia)}>
                {residencia.nombreResidencia} - Dirección: {residencia.direccion}
              </div>
            ))}
          </div>
        </div>
      </div>
  </main>
  )
}

export default ConsultaRecidentes;