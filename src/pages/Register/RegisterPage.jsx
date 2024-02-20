import React from 'react'
import SignUp from '../../components/LoginRegister/SignUp'
import SignIn from '../../components/LoginRegister/SignIn'
import { Outlet } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className='homeLoginRegister'>
        <Outlet/>
    </div>
  )
}

export default RegisterPage