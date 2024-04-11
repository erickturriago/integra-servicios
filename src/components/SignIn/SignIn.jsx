import React from 'react'
import './SignIn.css'
import inicioSesionService from "../../services/iniciarSesionUsuario";

const SignIn = () => {

  const {handleSubmit, register, errors} = useForm();
    const [email,setEmail] = useState('');
    // const [password,setPassword] = useState('');

    const navigate = useNavigate();


    const notifyError = ()=>{
        toast.error("Login Incorrect!",
        {position:"top-right",autoClose: 2000});
    }
    const notifySuccess = ()=>{
        toast.success("Login exitoso!",
        {position:"top-right",autoClose: 2000,onClose:()=>navigate("/home/reserva")});
    }


    const onSubmit = values =>{
        console.log(values)

        inicioSesionService(values)
        .then((response) => {
            console.log(response)
            if(response){
                notifySuccess();
            }
            else{
                notifyError();
            }
        })       

    }

    const handleClick = ()=>{
        navigate("/register");
    }


  return (
    <div className='containerSignIn'>
      <div className='containerForm'>
        <h3>Sign in</h3>
        <form action="">
          <div>
            <label htmlFor="">Username</label>
            <input type="text" placeholder='Username'/>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="text" placeholder='Password'/>
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
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn