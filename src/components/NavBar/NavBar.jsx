/* eslint-disable no-unused-vars */
import { Outlet, useNavigate, Link } from 'react-router-dom'
import './NavBar.css'
import Logo from '../../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDigg } from '@fortawesome/free-brands-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCubes } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {

    // const navigate = useNavigate();

    // console.log("renderizdo navbar")
    return (
        <>
            <nav>
                <Link to='/' className='logo'><FontAwesomeIcon icon={faDigg} className='icono' /><strong>Integra servicios</strong></Link>
                <ul className="nav__links">
                    <Link to='/info-usuario' className='option selected' id='userOption' ><FontAwesomeIcon icon={faUser} className='icono' />Mi cuenta</Link>
                    <Link to='/reserva' className='option unselected' id='recursosOption' ><FontAwesomeIcon icon={faList} className='icono' />Recursos</Link>
                    <Link to='' className='option unselected' id='reservasOption' ><FontAwesomeIcon icon={faCalendarCheck} className='icono' />Mis Reservas</Link>
                    <Link to='' className='option unselected' id='prestamosOption' ><FontAwesomeIcon icon={faHandshake} className='icono' />Prestamos</Link>
                    <Link to='' className='option unselected' id='devolucionesOption' ><FontAwesomeIcon icon={faRotateLeft} className='icono' />Devoluciones</Link>
                    <Link to='' className='option unselected' id='usuariosOption' ><FontAwesomeIcon icon={faUsers} className='icono' />Usuarios</Link>
                    <Link to='' className='option unselected' id='unidadesOption' ><FontAwesomeIcon icon={faCubes} className='icono' />Unidades</Link>

                </ul>
                <Link to='/' className="option unselected" id='signOutOption' ><FontAwesomeIcon icon={faRightFromBracket} className='icono' />Cerrar Sesion</Link>
            </nav>
            <Outlet />
        </>

    )
}

export default NavBar