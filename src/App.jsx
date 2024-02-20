
import { useState } from 'react'
import './App.css'
import SignIn from './components/LoginRegister/SignIn';
import SignUp from './components/LoginRegister/SignUp';
import RegisterPage from './pages/Register/RegisterPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';

function App() {

  const [isLogin,setIsLogin] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navigate to="/login"/>}/>

          <Route path='/' element={<RegisterPage/>}>
            <Route path='login' element={<SignIn/>}/>
            <Route path='register' element={<SignUp/>}/>
            <Route path='home' element={<HomePage/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
