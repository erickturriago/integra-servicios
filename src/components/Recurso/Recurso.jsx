import './Recurso.css'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useIntegraStates } from '../utils/global.Context'
import getRecursos from '../../services/get/getRecursos'
import deleteRecurso from '../../services/delete/deleteRecurso'
import { ToastContainer, toast } from 'react-toastify'
import ModalCrearRecurso from '../ModalCrearRecurso/ModalCrearRecurso'
import ModalEditarRecurso from '../ModalEditarRecurso/ModalEditarRecurso'
import ModalDetallesRecurso from '../ModalDetallesRecurso/ModalDetallesRecurso'

const Recursos = () => {
  const {state, dispatch} = useIntegraStates()
  const [reload,setReload] = useState(true)
  const [showModalCrearRecurso,setShowModalCrearRecurso] = useState(false)
  const [showModalEditarRecurso,setShowModalEditarRecurso] = useState(false)
  const [showModalDetallesRecurso,setShowDetallesRecurso] = useState(false)
  const [recursoEditar,setRecursoEditar] = useState(undefined)
  const [recursoDetalles,setRecursoDetalles] = useState(undefined);

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

  const handleDelete =  (idRecurso)=>{
    deleteRecurso(idRecurso)
      .then((response)=>{
        if(response.success){
          notify('success','Recurso eliminado!','bottom-right')
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
      })
  }


  useEffect(() => {
    getRecursos()
    .then((response) => {
        if(response.succes){
          dispatch({type:'SET_LIST_RECURSOS',payload:response.responseData})
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
    }) 
    }, [reload])

  
  return (
    <div className='container-home'>
      {showModalCrearRecurso && <ModalCrearRecurso setShowModalCrearRecurso={setShowModalCrearRecurso} reload={reload} setReload={setReload} notify={notify}/>}
      {showModalEditarRecurso && <ModalEditarRecurso setShowModalEditarRecurso={setShowModalEditarRecurso} recursoEditar={recursoEditar} reload={reload} setReload={setReload}/>}
      {showModalDetallesRecurso && <ModalDetallesRecurso setShowDetallesRecurso={setShowDetallesRecurso} recursoDetalles={recursoDetalles}/>}
      <div className='containerRecursos'>
        <button onClick={()=>setShowModalCrearRecurso(true)}>Crear</button>
        <div className='list-recursos'>
          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Unidad</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.recursosList.sort((a, b) => a.id - b.id).map((recurso)=>{
                return(
                  <tr key={recurso.id}>
                    <td>{recurso.id}</td>
                    <td>{recurso.nombre}</td>
                    <td>Universitario</td>
                    <td>{recurso.unidad.nombre}</td>
                    <td onClick={()=>{setRecursoEditar(recurso);setShowModalEditarRecurso(true);}}><FontAwesomeIcon icon={faPencil} className='reserva-icon'/></td>
                    <td onClick={()=>handleDelete(recurso.id)}><FontAwesomeIcon icon={faTrashCan} className='reserva-icon'/></td>
                    <td onClick={()=>{setRecursoDetalles(recurso);setShowDetallesRecurso(true);}}><button className='btn-detalles'>Detalles</button></td>
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

export default Recursos