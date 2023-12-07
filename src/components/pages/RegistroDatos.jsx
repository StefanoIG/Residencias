import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./registrodatos.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RegistroDatos = () => {

  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [formData, setFormData] = useState({
    nombreResidencia: "",
    direccion: "",
    cantidadHabitaciones: "",
    extras: "",
    contacto: "",
    emailContacto: "",
    telefonoContacto: ""
  });
    useEffect(() => {
      // Verificar si el usuario está logueado al cargar el componente
      const signedIn = localStorage.getItem("isSignedIn") === "true";
      setIsSignedIn(signedIn);
    }, []);


    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const generateAccessCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (Object.values(formData).some(value => value.trim() === "")) {
        MySwal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Por favor, completa todos los campos.',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }
    
      const accessCode = generateAccessCode();
      const nuevaResidencia = { ...formData, accessCode };
    
      let residenciasData = JSON.parse(localStorage.getItem("residenciaData") || "[]");
      
      // Si los datos no son un arreglo, reinicializar como un arreglo vacío
      if (!Array.isArray(residenciasData)) {
        residenciasData = [];
      }
    
      residenciasData.push(nuevaResidencia);
      localStorage.setItem("residenciaData", JSON.stringify(residenciasData));
    
      MySwal.fire({
        title: 'Residencia Registrada',
        text: `El código de acceso es: ${accessCode}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate("/"); // O la ruta que desees después del registro
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
            <li><NavLink to={"/consultarecidentes"} className={"bold-text text-white"}>Consultar Datos</NavLink></li>
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
      <form onSubmit={handleSubmit}>
      <h1>Registrar Residencia Estudiantil</h1>
      <div className="input-field">
        <label htmlFor="nombreResidencia">Nombre de la Residencia</label>
        <input
          type="text"
          name="nombreResidencia"
          id="nombreResidencia"
          required
          onChange={handleChange}
          value={formData.nombreResidencia}
        />
      </div>
      <div className="input-field">
        <label htmlFor="direccion">Dirección</label>
        <input
          type="text"
          name="direccion"
          id="direccion"
          required
          onChange={handleChange}
          value={formData.direccion}
        />
      </div>
      <div className="input-field">
        <label htmlFor="cantidadHabitaciones">Cantidad de Habitaciones</label>
        <input
          type="number"
          name="cantidadHabitaciones"
          id="cantidadHabitaciones"
          required
          onChange={handleChange}
          value={formData.cantidadHabitaciones}
        />
      </div>
      <div className="input-field">
        <label htmlFor="extras">Extras (ej. Wifi, Lavandería)</label>
        <input
          type="text"
          name="extras"
          id="extras"
          onChange={handleChange}
          value={formData.extras}
        />
      </div>
      <div className="input-field">
        <label htmlFor="contacto">Nombre de Contacto</label>
        <input
          type="text"
          name="contacto"
          id="contacto"
          required
          onChange={handleChange}
          value={formData.contacto}
        />
      </div>
      <div className="input-field">
        <label htmlFor="emailContacto">Correo Electrónico de Contacto</label>
        <input
          type="email"
          name="emailContacto"
          id="emailContacto"
          required
          onChange={handleChange}
          value={formData.emailContacto}
        />
      </div>
      <div className="input-field">
        <label htmlFor="telefonoContacto">Teléfono de Contacto</label>
        <input
          type="number"
          name="telefonoContacto"
          id="telefonoContacto"
          required
          onChange={handleChange}
          value={formData.telefonoContacto}
        />
      </div>
      <div className="btn-container">
        <button type="submit">Registrar Residencia</button>
      </div>
    </form>

        </div>
      </div>
    </main>
  );
};

export default RegistroDatos;
