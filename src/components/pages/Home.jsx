import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

import "./home.css"
import Hotel from "../../../public/foto6.jpg"
import foto5 from "../../../public/foto5.jpg"
import foto4 from "../../../public/foto4.jpg"
import foto3 from "../../../public/foto3.jpg"
import foto2 from "../../../public/foto2.jpg"
import foto11 from "../../../public/foto11.jpg"
import foto12 from "../../../public/foto12.jpg"
const Home = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
      // Verificar si el usuario está logueado al cargar el componente
      const signedIn = localStorage.getItem("isSignedIn") === "true";
      setIsSignedIn(signedIn);
    }, []);
    return (
        <div>

            <main>
                <section className="bg-image">
                    <header>
                    <ul>
                        <li><NavLink to={"/"} className={"bold-text text-white"}>Inicio</NavLink></li>
                        {isSignedIn ? (
                        <>
                            <li><NavLink to={"/controlacceso"} className={"bold-text text-white"}>Codigo Acceso</NavLink></li>
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
                        {/* Codigo extras */}
                    </ul>
                    </header>
                    <div>
                        <h1 className="text-white xl-text">Bienvenidos a la recidencia Universitaria ULEAM</h1>
                        <h3 className="text-white l-text" >La recidencia de mejor categoria para estudiantes Universitarios</h3>
                    </div>
                </section>
                <section className="second">
                    <h1>Conoce sobre nuestra Recidencia</h1>
                    <div className="text-container">
                        <div>
                            <img src={Hotel} alt="hotel" id="hotel" />
                        </div>
                        <div className="texto">
                            <div>
                                <h2>Area Recreativa</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque consequuntur laboriosam, explicabo voluptas soluta enim unde est. Amet delectus numquam in et, velit dolor, veritatis architecto voluptate error aperiam voluptas!</p>
                            </div>
                            <div>
                                <h2>Buena seguridad y acceso</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque consequuntur laboriosam, explicabo voluptas soluta enim unde est. Amet delectus numquam in et, velit dolor, veritatis architecto voluptate error aperiam voluptas!</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="detalles">
                    <h1>Detalle sobre nuestra recidencias</h1>
                    <div>
                        <div className="card-container">
                            <div className="card">
                                <img src={foto4} alt="" />
                            </div>
                            <div className="card">
                                <img src={foto5} alt="" />

                            </div>
                            <div className="card">
                                <img src={foto3} alt="" />
                            </div>
                        </div>
                        <div className="card-container">
                            <div className="card">
                                <img src={foto2} alt="" />

                            </div>
                            <div className="card">
                                <img src={foto11} alt="" />

                            </div>
                            <div className="card">
                                <img src={foto12} alt="" />

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home;