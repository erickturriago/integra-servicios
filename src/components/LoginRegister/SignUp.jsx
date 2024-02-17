import { useState } from "react";
import { usuarios } from "./usuario";

const SignUp = ({isLogin,setIsLogin}) => {
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');

    console.log(usuarios)


    const submitForm = (event)=>{
        event.preventDefault();
        let texto = `Usuario: ${user} Contraseña:${password}`;
        console.log(texto);

        

        //Llamado al API y validacion de datos

    }
  return (
    <div className="homeLoginRegister">
        <div className="containerFormRegister">
            <form action="" className="formLoginRegister" onSubmit={submitForm}>
                <h2>Sign Up</h2>
                <div className="containerInputs">
                    <div className="divInput">
                        <input type="text" className="form__input" id="name" placeholder="nombre" required="" />
                        <label htmlFor="user" className="form__label">Nombre</label>
                    </div>
                    <div className="divInput">
                        <input type="text" className="form__input" id="name" placeholder="apellido" required="" />
                        <label htmlFor="user" className="form__label">Apellido</label>
                    </div>
                    <div className="divInput">
                        <input type="text" className="form__input" id="name" placeholder="example@example.com" required="" />
                        <label htmlFor="user" className="form__label">Correo</label>
                    </div>
                    <div className="divInput">
                        <input type="text" className="form__input" id="name" placeholder="password" required="" />
                        <label htmlFor="password" className="form__label">Contraseña</label>
                    </div>
                    <div className="divInput">
                        <input type="text" className="form__input" id="name" placeholder="re-password" required="" />
                        <label htmlFor="password" className="form__label">Confirmar Contraseña</label>
                    </div>
                </div>
                <div>
                    {}
                </div>
                <div className="divButtons">
                    <button type="submit" className="buttonSignUp">Sign Up</button>
                    <button type="button" className="buttonSignIn"
                    onClick={()=>{setIsLogin(!isLogin)}}
                    >Sign In</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp