import getReservas from '../../services/get/getReservas';
import { useIntegraStates } from '../utils/global.Context';
import { useEffect, useState } from 'react';
import { ToastContainer} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil, faBan} from '@fortawesome/free-solid-svg-icons'
import './Reserva.css'


const Reserva = () => {

  const {state, dispatch} = useIntegraStates()
  
  const [reload, setReload] = useState(true)

  useEffect(() =>{
    getReservas()
    .then(response => {
      if(response.succes){
        let reservas = []
        if(state.userData.rol == 'ROLE_ADMIN'){
          reservas=response.responseData;
        }
        if(state.userData.rol == 'ROLE_USER'){
          reservas = response.responseData.filter((r)=>r.usuario.id == state.userData.id);
        }
        dispatch({type: 'SET_LIST_RESERVAS', payload: reservas})
        console.log(state.reservasList)
      }
    })
  },[reload])

  return (
    <div className='container-home'>
      <div className='containerReservas'>
        <div className='list-reservas'>
          <table className='table'>
            <thead>
              <tr>
                <th>Recurso</th>
                <th>Usuario</th>
                <th>Fecha Reserva</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Estado</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.reservasList.map((reserva)=>{
                return(
                  <tr key={reserva.id}>
                    <td>{reserva.recurso.nombre}</td>
                    <td>{reserva.usuario.fullname}</td>
                    <td>{reserva.fechaReserva}</td>
                    <td>{reserva.horaInicio}</td>
                    <td>{reserva.horaFin}</td>
                    <td>{reserva.estado}</td>
                    {
                      state.userData.rol == 'ROLE_ADMIN' &&
                      <>
                        <td><FontAwesomeIcon icon={faPencil} className='reserva-icon'/></td>
                        <td><FontAwesomeIcon icon={faBan} className='reserva-icon'/></td>
                      </>
                    }
                    {
                      state.userData.rol == 'ROLE_USER' && reserva.estado == 'Activa' && 
                        <td><FontAwesomeIcon icon={faBan} className='reserva-icon'/></td>
                    }
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
  // return (
  //   <div className='containerReservas'>
  //     {/* {recursos.map((recurso,index)=>{
  //       // return <RecursoReserva key={index} recurso={recurso}/>
  //       return <></>
  //     })} */}
  //   </div>
  // )
}

export default Reserva