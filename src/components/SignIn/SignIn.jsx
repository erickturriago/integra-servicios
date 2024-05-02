import { useNavigate } from 'react-router-dom';
import inicioSesionService from "../../services/iniciarSesionUsuario";
import './SignIn.css'
import { ToastContainer, toast } from 'react-toastify';
import {validarSignInForm} from '../../services/validacionForm'
import { useState } from 'react';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    contraseña: ''
  });
  const [errors, setErrors] = useState({});

  const notifySuccess = ()=>{
    console.log("Noficiando success")
      toast.success("Login exitoso!",
      {position:"top-right",autoClose: 1000});
      // {position:"top-right",autoClose: 1000,onClose:()=>navigate('/login')});
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
            if(response){
                notifySuccess();
            }
        }) 
    }
  };


  return (
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
  )
}

export default SignIn