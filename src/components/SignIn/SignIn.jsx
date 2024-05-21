import { useNavigate } from 'react-router-dom';
import inicioSesionService from "../../services/get/iniciarSesionUsuario";
import './SignIn.css'
import {validarSignInForm} from "../utils/validacionForm"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useIntegraStates } from '../utils/global.Context';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    contraseña: ''
  });
  const {state, dispatch} = useIntegraStates();
  const [errors, setErrors] = useState({});

  const notifySuccess = ()=>{
      toast.success("Login exitoso!",
      {position:"top-right",autoClose: 1000,onClose:()=>navigate('/recursos')});
  }

  const notifyError = ()=>{
    console.log("Noficiando success")
      toast.error("Credenciales inválidas",
      {position:"top-right",autoClose: 1000});
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validarSignInForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      inicioSesionService(formData)
        .then((response) => {
            console.log(response)
            if(response.success){
              dispatch({type: 'SET_USER_INFO', payload: response.responseData})
              dispatch({type: 'SET_TOKEN', payload: response.token})
              localStorage.setItem('info_usuario',JSON.stringify(response.responseData))
              notifySuccess();
            }
            else{
              notifyError();
            }
        }) 
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem('token');
    token!=undefined?navigate("/recursos"):""
  },[])


  return (
    <div className='homeSignInSignUp'>
    <div className='containerSignIn'>
      <div className='containerForm'>
        <h3>Sign in</h3>
        <form action="" onSubmit={handleSubmit}>
        <div className={errors.email ? 'error-field' : ''}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className={errors.contraseña ? 'error-field' : ''}>
            <label htmlFor="">contraseña</label>
            <input
              type="password"
              placeholder='Contraseña'
              value={formData.contraseña}
              onChange={handleChange}
              name="contraseña"
            />
            {errors.contraseña && <span className="error-message">{errors.email}</span>}
          </div>
          <div>
            <button className='btn-signin'>Sign In</button>
          </div>
        </form>
        <p>Forgot Password?</p>
      </div>
      <div className='containerWelcome'>
        <div>
          <h2>Welcome to login</h2>
          <p>Don’t have an account?</p>
          <button onClick={()=>navigate('/register')}>Sign Up</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
    </div>
  )
}

export default SignIn
