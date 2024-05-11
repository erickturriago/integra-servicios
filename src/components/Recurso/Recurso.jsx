import './Recurso.css'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useIntegraStates } from '../utils/global.Context'
import getRecursos from '../../services/get/getRecursos'
import deleteRecurso from '../../services/delete/deleteRecurso'
import { ToastContainer, toast } from 'react-toastify'
import ModalRecurso from '../ModalRecurso/ModalRecurso'

const Recursos = () => {
  const {state, dispatch} = useIntegraStates()
  const [reload,setReload] = useState(true)
  const [showModal,setShowModal] = useState(false)

  const notify = (order)=>{
    if(order=='success'){
      toast.success("Recurso eliminado!",
      {position:"top-right",autoClose: 500,onClose:()=>setReload(!reload)});
    }
    else{
      toast.error("Id Inválido",
      {position:"top-right",autoClose: 1000});
    }

}

  const handleDelete =  (idRecurso)=>{
    deleteRecurso(idRecurso)
      .then((response)=>{
        if(response.success){
          notify('success')
        }
        else{
          notify('error')
        }
      })
  }


  useEffect(() => {
    getRecursos()
    .then((response) => {
        dispatch({type:'SET_LIST_RECURSOS',payload:response.responseData})
    }) 
    }, [reload])

  
  return (
    <div className='container-home'>
      {showModal && <ModalRecurso setShowModal={setShowModal}/>}
      <div className='containerRecursos'>
        <button onClick={()=>setShowModal(true)}>Crear</button>
        <div className='list-recursos'>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Unidad</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.recursosList.map((recurso)=>{
                return(
                  <tr key={recurso.id}>
                    <td>{recurso.nombre}</td>
                    <td>Universitario</td>
                    <td>{recurso.unidad.nombre}</td>
                    <td><FontAwesomeIcon icon={faPencil} className='reserva-icon'/></td>
                    <td onClick={()=>handleDelete(recurso.id)}><FontAwesomeIcon icon={faTrashCan} className='reserva-icon'/></td>
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