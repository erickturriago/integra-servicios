import getUsuarios from '../../services/get/getUsuarios';
import { useIntegraStates } from '../utils/global.Context';
import { useEffect, useState } from 'react';
import { ToastContainer} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons'
import './Usuarios.css'
import ModalEditarUsuario from '../ModalEditarUsuario/ModalEditarUsuario';


const Usuarios = () => {

  const {state, dispatch} = useIntegraStates()
  const [showModalEditarUsuario,setShowModalEditarUsuario] = useState(false)
  const [usuarioEditar,setUsuarioEditar] = useState(null)
  const [reload,setReload] = useState(true)

  const getRol = (idRol)=>{
    let rol = '';
    switch(idRol){
      case 1:
        rol = "ADMIN"
        break;
      case 2:
        rol = "USER"
        break;
      case 3:
        rol = "ALIADO"
        break;
    }
    return rol
  }

  useEffect(() =>{
    getUsuarios()
    .then(response => {
      if(response.succes){
        console.log(state.usuariosList)
        dispatch({type: 'SET_LIST_USUARIOS', payload: response.responseData})
        console.log(state.usuariosList)
      }
    })
  },[reload])

  return (
    <div className='container-home'>
      {showModalEditarUsuario && <ModalEditarUsuario setShowModalEditarUsuario={setShowModalEditarUsuario} reload={reload} setReload={setReload} usuarioEditar={usuarioEditar}/>}
      <div className='containerUsuarios'>
        <div className='list-usuarios'>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cedula</th>
                <th>E-mail</th>
                <th>Rol</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.usuariosList.map((usuario)=>{
                return(
                  <tr key={usuario.id}>
                    <td>{usuario.fullname}</td>
                    <td>{usuario.cedula}</td>
                    <td>{usuario.email}</td>
                    <td>{getRol(usuario.rol)}</td>
                    <td onClick={()=>{setUsuarioEditar(usuario);setShowModalEditarUsuario(true);}}><FontAwesomeIcon icon={faPencil} className='reserva-icon'/></td>
                    <td><FontAwesomeIcon icon={faTrashCan} className='reserva-icon'/></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Usuarios