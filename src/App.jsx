
import { useState } from 'react'
import './App.css'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Prestamo from './components/Prestamo/Prestamo';
import Reserva from './components/Reserva/Reserva';
import ProtectedRoute from './components/utils/ProtectedRoute';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<SignIn/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/reserva" element={<Reserva/>}/>
            {/* <Route path="home" element={<NavBar/>}>
              <Route path="reserva" element={<Reserva/>}></Route>
              <Route path="prestamo" element={<Prestamo/>}></Route>
            </Route> */}
        </Route>

        <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
