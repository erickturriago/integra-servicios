import { Outlet, useNavigate } from 'react-router-dom'
import './NavBar.css'
import Logo from '../../assets/Logo.png' 

const NavBar = () => {

    const navigate = useNavigate();

    console.log("renderizdo navbar")
  return (
    <>
        <header>
            <img src={Logo} className='logo' alt="" />
            <nav>
                <ul className="nav__links">
                    <li><a href="" onClick={()=>navigate("/home/reserva")}>Reserva</a></li>
                    <li><a href="" onClick={()=>navigate("/home/prestamo")}>Prestamo</a></li>
                    <li><a href="" onClick={()=>navigate("/home/ayuda")}>Ayuda</a></li>
                </ul>
            </nav>
            <a href="" className="cta"><button>Contact</button></a>
        </header>
        <Outlet/>
    </>
    
  )
}

export default NavBar