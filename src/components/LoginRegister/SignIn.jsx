import { useState } from 'react';
import './LoginRegister.css'

const SignIn = ({isLogin,setIsLogin}) => {
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');


    const submitForm = (event)=>{
        event.preventDefault();
        let texto = `Usuario: ${user} Contraseña:${password}`;
        console.log(texto);

        

        //Llamado al API y validacion de datos

    }
  return (


    <div className="homeLoginRegister">
        <div className="containerFormLogin">
            <form action="" className="formLoginRegister" onSubmit={submitForm}>
                <h2>Sign In</h2>
                <div className="containerInputs">
                    <div className="divInput">
                        <input type="text" className="form__input" id="name" placeholder="example@example.com" required="" />
                        <label htmlFor="name" className="form__label">Email</label>
                    </div>
                    <div className="divInput">
                        <input type="password" className="form__input" id="name" placeholder="password" required="" />
                        <label htmlFor="name" className="form__label">Password</label>
                    </div>
                    <p>¿Olvidaste tu contraseña? <a href="" className="">Click aqui</a></p>
                </div>
                <div className="divButtons">
                    <button type="submit" className="buttonSignIn">Sign In</button>
                    <button type="button" className="buttonSignUp"
                    onClick={()=>{setIsLogin(!isLogin)}}
                    >Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn