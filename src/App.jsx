import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import RegistroDatos from './components/pages/RegistroDatos'
import ControlAcceso from './components/pages/ControlAcceso'
import ConsultaRecidentes from './components/pages/ConsultaRecidentes'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/registrodatos' element={<RegistroDatos />}/>
          <Route path='/controlacceso' element={<ControlAcceso />}/>
          <Route path='/consultarecidentes' element={<ConsultaRecidentes />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App