import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerService from "../../services/registrarUsuario";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {

    const {handleSubmit, register, errors} = useForm();

    const navigate = useNavigate();

    const notify = ()=>{
        toast.success("Registro exitoso!",
        {position:"top-right",autoClose: 2000,onClose:()=>navigate("/login")});
    }

    const onSubmit = values =>{

        registerService(values)
        .then((response) => {
            notify();
        })       

    }

    const handleClick = ()=>{
        navigate("/login");
    }

    useEffect(()=>{
        console.log("Montando")
    },[])

  return (
    <>
    <div className="containerFormRegister">
            <form action="" className="formLoginRegister" onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>
                <div className="containerInputs">

                    <div className="divInput">
                        <input 
                            type="text" 
                            className="form__input" 
                            placeholder="nombre" 
                            {...register("nombre")}
                            // ref={register({ required: 'This is required' })}
                        />
                        {/* <ErrorMessage errors={errors} name='username' as="small"/> */}
                        <label className="form__label">Nombre</label>
                    </div>

                    <div className="divInput">
                        <input 
                            type="text" 
                            className="form__input" 
                            placeholder="apellido" 
                            name="apellido" 
                            {...register("apellido")}
                        />
                        {/* <ErrorMessage errors={errors} name='username' as="small"/> */}
                        <label className="form__label">Apellido</label>
                    </div>

                    <div className="divInput">
                        <input 
                            type="password" 
                            className="form__input" 
                            placeholder="contraseña" 
                            {...register("contraseña")}
                        />
                        <label htmlFor="password" className="form__label">Contraseña</label>
                    </div>

                    <div className="divInput">
                        <input 
                            type="text" 
                            className="form__input" 
                            placeholder="example@example.com" 
                            {...register("email")}
                        />
                        <label htmlFor="user" className="form__label">Correo</label>
                    </div>

                    <div className="divInput">
                        <input 
                            className="form__input" 
                            placeholder="cedula" 
                            type="number"
                            {...register("cedula", {
                                setValueAs: v => parseInt(v),
                            })}
                        />
                        <label htmlFor="password" className="form__label">Cedula</label>
                    </div>
                    

                </div>
                <div className="divButtons">
                    <button type="submit" className="primaryButton">Sign Up</button>
                    <button type="button" className="secondaryButton" onClick={handleClick}>Sign In</button>
                </div>
            </form>
        </div>
        <ToastContainer/>
        </>
  )
}

export default SignUp