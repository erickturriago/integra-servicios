import './Recurso.css'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import getRecursos from '../../services/getRecursos'
import { useIntegraStates } from '../utils/global.Context'

const Recursos = () => {
  const {state, dispatch} = useIntegraStates()


  useEffect(() => {
    console.log('recursos')
    console.log(state)
    getRecursos()
    .then((response) => {
        dispatch({type:'SET_LIST_RECURSOS',payload:response.responseData})

    }) 
    }, [])
  return (
    <div className='container-home'>
      <div className='containerRecursos'>
        <button>Crear</button>
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
              {state.recursosList.map((recurso,index)=>{
                return(
                  <tr key={index}>
                    <td>{recurso.nombre}</td>
                    <td>Universitario</td>
                    <td>{recurso.unidad.nombre}</td>
                    <td><FontAwesomeIcon icon={faTrashCan} className='reserva-icon'/></td>
                    <td><FontAwesomeIcon icon={faPencil} className='reserva-icon'/></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Recursos