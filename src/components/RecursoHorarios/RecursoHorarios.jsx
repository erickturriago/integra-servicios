import './RecursoHorarios.css'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const TablaRecursos = () => {
  return (<table className='integra-serv-tabla'>
    <thead>
      <th>Recurso</th>
      <th>Tipo</th>
      <th>Unidad</th>
      <th>Horario</th>
      <th>Disponibilidad</th>
      <th className='celda-btn' />
    </thead>
    <tbody>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr className='unavailable'>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'></td>
      </tr>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr className='unavailable'>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'></td>
      </tr>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr className='unavailable'>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'></td>
      </tr>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr className='unavailable'>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'></td>
      </tr>            <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr className='unavailable'>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'></td>
      </tr>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'><button className='integra-serv-primary-btn'>Agregar</button></td>
      </tr>
      <tr className='unavailable'>
        <td>Recurso</td>
        <td>Tipo</td>
        <td>Unidad</td>
        <td>Horario</td>
        <td>Disponibilidad</td>
        <td className='celda-btn'></td>
      </tr>
    </tbody>
  </table>)
}

const RecursoHorarios = () => {
  return (
    <div id='containerRecursos'>
      <div id='containerBusqueda'>
        <input type="text" id='barraBusqueda' className='sombreado' placeholder="&#xF002;" style={{ fontFamily: 'Lato, Arial, FontAwesome', fontSize: '1.3rem' }} />
        <button type='submit' className='integra-serv-primary-btn'>Buscar</button>
        <span><FontAwesomeIcon icon={faCalendarDays} /></span>
      </div>
      <div className='sombreado' id='containerHoras'>
        <h1>Recursos</h1>
        <TablaRecursos />
      </div>
    </div>)
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