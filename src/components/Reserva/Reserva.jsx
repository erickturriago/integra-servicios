import getReservas from '../../services/get/getReservas';
import { useIntegraStates } from '../utils/global.Context';
import { useEffect, useState } from 'react';
import { ToastContainer, toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil, faBan, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import './Reserva.css'
import {actualizarReserva} from '../../services/update/actualizarReserva';
import cancelReserva from '../../services/delete/cancelReserva';


const Reserva = () => {

  const {state, dispatch} = useIntegraStates()
  const [reload, setReload] = useState(true)
  const [reservasActualizar,setReservasActualizar] = useState([]);

  

  const notify = (orden,mensaje,posicion)=>{
    if(orden=='success'){
      toast.success(mensaje,
      {position:posicion,autoClose: 500,onClose:()=>setReload(!reload)});
    }
    else{
      toast.error(mensaje,
      {position:posicion,autoClose: 1000});
    }
  }

  const handleCancel =  (idReserva)=>{
    if(confirm("¿Está seguro de cancelar la reserva?")){
      cancelReserva(idReserva)
      .then((response)=>{
        if(response.success){
          notify('success','Reserva cancelada!','bottom-right')
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
      })
    }
  }

  const agregarReservaActualizar = (e,reservaActualizar)=>{
    console.log(reservaActualizar)
    let reserva = null
    reserva = reservasActualizar.find((r)=>r.id==reservaActualizar.id)
    if(!reserva){
      let reservaCopia = {...reservaActualizar};
      reservaCopia.estado = e.target.value;
      // console.log(reservaCopia)
      setReservasActualizar(prevState => [...prevState, reservaCopia]);
    }
    console.log(reservasActualizar)
  }

  const handleUpdateReserva = (e,reservaClick)=>{

    let reservaUpdate = reservasActualizar.find((r)=>r.id==reservaClick.id)

    const form = {
      "id":reservaUpdate.id,
      "idRecurso":reservaUpdate.recurso.id,
      "idUsuario":reservaUpdate.usuario.id,
      "estado":reservaUpdate.estado,
      "horaInicio":reservaUpdate.horaInicio,
      "horaFin":reservaUpdate.horaFin,
      "fechaReserva": reservaUpdate.fechaReserva,
      "fechaCreacion":reservaUpdate.fechaCreacion
    }

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    const segundos = String(hoy.getSeconds()).padStart(2, '0');

    let fechaHoy = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

    if(reservaUpdate.estado=="Prestamo"){
      form.fechaPrestamo = fechaHoy;
    }
    else if(reservaUpdate.estado=="Devolucion"){
      form.fechaDevolucion = fechaHoy;
    }

    if(confirm("¿Está seguro de editar la unidad?")){
      actualizarReserva(form)
      .then((response)=>{
        if(response.success){
          setReservasActualizar(reservasActualizar.filter((r)=>r.id!=form.id));
          notify('success','Reserva actualizada!','bottom-right')
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
      })
    }
    
  }


  useEffect(() =>{
    getReservas()
    .then(response => {
      if(response.succes){
        let reservas = []
        if(state.userData){
          if(state.userData.rol == 'ROLE_ADMIN'){
            reservas=response.responseData;
          }
          if(state.userData.rol == 'ROLE_USER'){
            reservas = response.responseData.filter((r)=>r.usuario.id == state.userData.id && r.estado=="Activa" || r.estado=="Cancelada") ;
          }
        }
        dispatch({type: 'SET_LIST_RESERVAS', payload: reservas})
        console.log(state.reservasList)
      }
    })
  },[state.userData,reload])

  return (
    <div className='container-home'>
      <div className='containerReservas'>
        <div className='list-reservas'>
          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Recurso</th>
                <th>Usuario</th>
                <th>Fecha Reserva</th>
                <th>Fecha Creacion</th>
                {
                      state.userData && state.userData.rol=="ROLE_ADMIN" &&
                      <>
                        <th>Fecha Prestamo</th>
                        <th>Fecha Devolucion</th>
                      </>
                    }
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Estado</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.reservasList.sort((a, b) => b.id - a.id).map((reserva)=>{
                return(
                  <tr key={reserva.id}>
                    <th>{reserva.id}</th>
                    <td>{reserva.recurso.nombre}</td>
                    <td>{reserva.usuario.fullname}</td>
                    <td>{reserva.fechaReserva}</td>
                    <td>{reserva.fechaCreacion}</td>
                    {
                      state.userData.rol=="ROLE_ADMIN" &&
                      <>
                        <td>{reserva.fechaPrestamo}</td>
                        <td>{reserva.fechaDevolucion}</td>
                      </>
                    }
                    <td>{reserva.horaInicio}</td>
                    <td>{reserva.horaFin}</td>
                    {
                      state.userData.rol=="ROLE_USER" &&
                      <td>{reserva.estado}</td>
                    }
                    {
                      state.userData.rol=="ROLE_ADMIN" &&
                      <td>
                        <select name="" id="" onChange={(e)=>agregarReservaActualizar(e,reserva)}>
                        <option defaultValue hidden>{reserva.estado!=''?reserva.estado:'Seleccionar'}</option>
                          {
                            reserva.estado == "Activa" &&
                            <>
                              <option>Activa</option>
                              <option>Cancelada</option>
                              <option>Prestamo</option>
                            </>
                          }
                          {
                            reserva.estado == "Prestamo" &&
                            <>
                              <option>Devolucion</option>
                            </>
                          }
                        </select>
                      </td>
                    }
                    {
                      state.userData.rol == 'ROLE_ADMIN' && reservasActualizar.filter((r)=>r.id==reserva.id).length>0 &&
                      <>
                        <td onClick={(e)=>handleUpdateReserva(e,reserva)}><FontAwesomeIcon icon={faFloppyDisk} className='reserva-icon'/></td>
                        {/* <td onClick={()=>handleCancel(reserva.id)}><FontAwesomeIcon icon={faBan} className='reserva-icon'/></td> */}
                      </>
                    }
                    {
                      state.userData.rol == 'ROLE_USER' && reserva.estado == 'Activa' && 
                        <td onClick={()=>handleCancel(reserva.id)}><FontAwesomeIcon icon={faBan} className='reserva-icon'/></td>
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