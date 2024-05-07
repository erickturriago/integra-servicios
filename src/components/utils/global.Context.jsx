import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducers/reducer";

const UsuarioContext = createContext()

export const useUsuario = () => useContext(UsuarioContext)

// eslint-disable-next-line react/prop-types
export function ContextProvider({ children }) {
    const usuario = {
        nombre: 'roger gomez',
        documento: '1000352413',
        telefono: '3227930616',
        correo: 'rogergt02@gmail.com',
        ocupacion: 'Estudiante',
        estado: 'Activo'
    }
    const [state, dispatch] = useReducer(reducer, usuario)
    //console.log(state)
    return (
        <UsuarioContext.Provider value={{state, dispatch}}>
            {children}
        </UsuarioContext.Provider>
    )
}