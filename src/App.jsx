/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Prestamo from './components/Prestamo/Prestamo';
import Reserva from './components/Reserva/Reserva';
import InfoUsuario from './components/InfoUsuario/InfoUsuario';
import HomeAdmin from './components/HomeAdmin/HomeAdmin';
import { ContextProvider } from './components/utils/global.Context';
import ProtectedRoute from './components/utils/ProtectedRoute';

function App() {
  const [showNavBar, setShowNavBar] = useState(true)
  useEffect(() => {
    const currentPath = window.location.pathname
    setShowNavBar(currentPath != '/login' && currentPath != '/register')
  }, [])

  return (
    <ContextProvider>
      {/* <InfoUsuario/> */}
      {/* <RecursoHorarios/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<NavBar />}>
              <Route path="/home" element={<HomeAdmin />}></Route>
              <Route path='/info-usuario' element={<InfoUsuario />}></Route>
              <Route path="/recursos" element={<h1>Recursos</h1>}></Route>
              <Route path="/reservas" element={<h1>reservas</h1>}></Route>
              <Route path="/prestamos" element={<h1>prestamos</h1>}></Route>
              <Route path="/devoluciones" element={<h1>devoluciones</h1>}></Route>
              <Route path="/usuarios" element={<h1>usuarios</h1>}></Route>
              <Route path="/unidades" element={<h1>unidades</h1>}></Route>
            </Route>
          </Route>

          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
