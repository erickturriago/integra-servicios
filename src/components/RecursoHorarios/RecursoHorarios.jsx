import './RecursoHorarios.css'
import NavBar from '../NavBar/NavBar'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const RecursoHorarios = () => {
  return (<>
    <NavBar />
    <div className='container'>
      <div className='containerBusqueda'>
        <input type="text" className='busqueda' id='barraBusqueda' placeholder="&#xF002;" style={{ fontFamily: 'Lato, Arial, FontAwesome', fontSize: '1.3rem' }} />
        <button type='submit' className='buscarBtn'>Buscar</button>
        <span><FontAwesomeIcon icon={faCalendarDays} /></span>
      </div>
      <div className='containerHoras'>
        <h1>Recursos</h1>
        <table>
          <thead>
            <th>Recurso</th>
            <th>Tipo</th>
            <th>Unidad</th>
            <th>Horario</th>
            <th>Disponibilidad</th>
            <th className='agregar' />
          </thead>
          <tbody>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr className='unavailable'>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'></td>
            </tr>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr className='unavailable'>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'></td>
            </tr>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr className='unavailable'>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'></td>
            </tr>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr className='unavailable'>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'></td>
            </tr>            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr className='unavailable'>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'></td>
            </tr>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'><button>Agregar</button></td>
            </tr>
            <tr className='unavailable'>
              <td>Recurso</td>
              <td>Tipo</td>
              <td>Unidad</td>
              <td>Horario</td>
              <td>Disponibilidad</td>
              <td className='agregar'></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>)
}
// const RecursoHorarios = ({ showHorarios, setShowHorarios }) => {
//   return (
//     <>
//       <NavBar />
//       <div className='containerHoras'>
//         <div className='horas'>
//           <span>7:00 AM</span>
//           <span>9:00 AM</span>
//           <span>12:00 PM</span>
//           <span>7:00 PM</span>
//         </div>
//         <div className='saveDiv'>
//           <button onClick={() => setShowHorarios(!showHorarios)}>Enviar</button>
//         </div>
//       </div>
//     </>
//   )
// }

export default RecursoHorarios