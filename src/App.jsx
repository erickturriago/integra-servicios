
import { useState } from 'react'
import './App.css'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NavBar from './components/NavBar/NavBar';
import Prestamo from './components/Prestamo/Prestamo';
import Reserva from './components/Reserva/Reserva';
import RegisterPage from './pages/register/RegisterPage';

function App() {

  const [formRegisterData,setForRegisterData]=useState({
    'nombre':'',
    'apellido':'',
    'email':'',
    'cedula':'',
    'contraseña':'',
  })

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navigate to="/login"/>}/>
          <Route path='/' element={<RegisterPage/>}>
            <Route path='login' element={<SignIn/>}/>
            <Route path='register' element={<SignUp formData={formRegisterData} setFormData={setForRegisterData}/>}/>
          </Route>

          <Route path="home" element={<NavBar/>}>
              <Route path="reserva" element={<Reserva/>}></Route>
              <Route path="prestamo" element={<Prestamo/>}></Route>
            </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
