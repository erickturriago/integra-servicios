/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from 'react-router-dom'
import './InfoUsuario.css'
import NavBar from '../NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const StatsUsuario = () => {
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
const InfoUsuario = () => {
    return (
        <>
            <NavBar />
            <div id='containerUsuario'>
                <StatsUsuario/>
                <div id='containerInfo' className='sombreado'>
                    <div>
                        <h1><strong>Información del Usuario</strong></h1>
                        <span id='editIcon'><FontAwesomeIcon icon={faPencil} /></span>
                    </div>
                    <div>
                        <span id='userIcon'><FontAwesomeIcon icon={faUser} /></span>
                        <table id='tablaInfoUsuario'>
                            <tr>
                                <th>Nombre:</th>
                                <td>Erika Leonarda Sabogal Ostos</td>
                            </tr>
                            <tr>
                                <th>Documento:</th>
                                <td>1002442233</td>
                            </tr>
                            <tr>
                                <th>Telefono:</th>
                                <td>314 876 2792</td>
                            </tr>
                            <tr>
                                <th>Correo:</th>
                                <td>erikaleo@gmail.com</td>
                            </tr>
                            <tr>
                                <th>Ocupacion:</th>
                                <td>Estudiante</td>
                            </tr>
                            <tr>
                                <th>Estado:</th>
                                <td>Activo (a)</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoUsuario