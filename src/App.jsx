
import { useState } from 'react'
import './App.css'
import SignIn from './components/LoginRegister/SignIn';
import SignUp from './components/LoginRegister/SignUp';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NavBar from './components/NavBar/NavBar';
import Prestamo from './components/Prestamo/Prestamo';
import Reserva from './components/Reserva/Reserva';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navigate to="/login"/>}/>

          <Route path='/' element={<RegisterPage/>}>
            <Route path='login' element={<SignIn/>}/>
            <Route path='register' element={<SignUp/>}/>
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
