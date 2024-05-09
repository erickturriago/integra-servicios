/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from 'react-router-dom'
import './InfoUsuario.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useUsuario } from '../utils/global.Context'

const StatsUsuario = () => {
    return (
        <div id='containerStats'>
            <div className="card-info sombreado" id='saldosCard'>
                <div><p>40</p><p>T. Recursos</p></div>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
            <div className="card-info sombreado" id='reservasCard'>
                <div><p>40</p><p>T. Reservas</p></div>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
            <div className="card-info sombreado" id='prestamosCard'>
                <div><p>40</p><p>T. Prestamos</p></div>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
            <div className="card-info sombreado" id='devolucionesCard'>
                <div><p>40</p><p>T. Devoluciones</p></div>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
        </div>
    )
}
const InfoUsuario = () => {
    const {state} = useUsuario()
    console.log(state)
    return (
        <>
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
                                <td>{state.nombre}</td>
                            </tr>
                            <tr>
                                <th>Documento:</th>
                                <td>{state.documento}</td>
                            </tr>
                            <tr>
                                <th>Telefono:</th>
                                <td>{state.telefono}</td>
                            </tr>
                            <tr>
                                <th>Correo:</th>
                                <td>{state.correo}</td>
                            </tr>
                            <tr>
                                <th>Ocupacion:</th>
                                <td>{state.ocupacion}</td>
                            </tr>
                            <tr>
                                <th>Estado:</th>
                                <td>{state.estado}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoUsuario