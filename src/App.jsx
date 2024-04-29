/* eslint-disable no-unused-vars */

import { useState } from 'react'
import './App.css'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NavBar from './components/NavBar/NavBar';
import Prestamo from './components/Prestamo/Prestamo';
import Reserva from './components/Reserva/Reserva';
import RecursoHorarios from './components/RecursoHorarios/RecursoHorarios';
import InfoUsuario from './components/InfoUsuario/InfoUsuario';
//import RegisterPage from './pages/register/RegisterPage';

function App() {

  const [formRegisterData, setForRegisterData] = useState({
    'nombre': '',
    'apellido': '',
    'email': '',
    'cedula': '',
    'contraseña': '',
  })

  return (
    <>
      {/* <InfoUsuario/> */}
      {/* <RecursoHorarios/> */}
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<SignIn />} />

          <Route path="home" element={<NavBar />}>
            <Route path='info-usuario' element={<InfoUsuario/>}></Route>
            <Route path="reserva" element={<RecursoHorarios/>}></Route>
            <Route path="prestamo" element={<Prestamo />}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
