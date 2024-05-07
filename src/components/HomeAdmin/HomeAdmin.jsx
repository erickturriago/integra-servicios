import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './HomeAdmin.css'
const Stats = () => {
    return (
        <div id='containerStats'>
            <div className="card-info sombreado" id='saldosCard'>
                <p><h1>40</h1><h2>Saldos<br />Pendientes</h2></p>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
            <div className="card-info sombreado" id='reservasCard'>
                <p><h1>40</h1><h2>Reservas<br />Realizadas</h2></p>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
            <div className="card-info sombreado" id='prestamosCard'>
                <p><h1>40</h1><h2>Prestamos<br />Realizados</h2></p>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
            <div className="card-info sombreado" id='devolucionesCard'>
                <p><h1>40</h1><h2>Devoluciones<br />Completadas</h2></p>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
        </div>
    )
}

const TablaReservas = () => {
    return (<table className='integra-serv-tabla'>
        <thead>
            <th>Recurso</th>
            <th>Tipo</th>
            <th>Unidad</th>
            <th>Horario</th>
            <th>Disponibilidad</th>
            <th />
        </thead>
        <tbody>
            <tr>
                <td>Recurso</td>
                <td>Tipo</td>
                <td>Unidad</td>
                <td>Horario</td>
                <td>Disponibilidad</td>
            </tr>
            <tr>
                <td>Recurso</td>
                <td>Tipo</td>
                <td>Unidad</td>
                <td>Horario</td>
                <td>Disponibilidad</td>
            </tr>
            <tr>
                <td>Recurso</td>
                <td>Tipo</td>
                <td>Unidad</td>
                <td>Horario</td>
                <td>Disponibilidad</td>
            </tr>
            <tr>
                <td>Recurso</td>
                <td>Tipo</td>
                <td>Unidad</td>
                <td>Horario</td>
                <td>Disponibilidad</td>
            </tr>
            <tr>
                <td>Recurso</td>
                <td>Tipo</td>
                <td>Unidad</td>
                <td>Horario</td>
                <td>Disponibilidad</td>
            </tr>
            <tr>
                <td>Recurso</td>
                <td>Tipo</td>
                <td>Unidad</td>
                <td>Horario</td>
                <td>Disponibilidad</td>
            </tr>
        </tbody>
    </table>)
}

const ListaUsuarios = () => {
    return (
        <div id='listaUsuarios' className="sombreado">
            <h1><strong>Usuarios</strong></h1>
            <ul>
              <li><Link><FontAwesomeIcon icon={faUserAlt} className='' />Luis Castaño</Link></li>  
              <li><Link><FontAwesomeIcon icon={faUserAlt} className='' />Luis Castaño</Link></li>  
              <li><Link><FontAwesomeIcon icon={faUserAlt} className='' />Luis Castaño</Link></li>  
              <li><Link><FontAwesomeIcon icon={faUserAlt} className='' />Luis Castaño</Link></li>  
            </ul>
            
        </div>)
}

const HomeAdmin = () => {
    return (
        <div id="containerHome">
            <Stats />
            <div id='containerData'>
                <div id='containerReservasAdmin'className="sombreado">
                    <TablaReservas />
                </div>
                <ListaUsuarios />
            </div>
        </div>
    )
}

export default HomeAdmin