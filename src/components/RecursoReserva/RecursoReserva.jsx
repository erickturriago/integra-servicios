import { useState } from 'react'
import Logo from '../../assets/Logo.png' 
import './RecursoReserva.css'
import RecursoHorarios from '../RecursoHorarios/RecursoHorarios';

const RecursoReserva = ({recurso}) => {

  const [showHorarios,setShowHorarios] = useState(false);

  return (
    <div className='recurso'>
      <div className='recursoTitulo'>
        <h3>{recurso}</h3>
      </div>
      <div className='recursoImage'>
        <img src={Logo} alt="" />
      </div>
      <div className='recursoOptions'>
        <button onClick={()=>setShowHorarios(!showHorarios)}>Reservar</button>
      </div>
      {showHorarios && <RecursoHorarios showHorarios={showHorarios} setShowHorarios={setShowHorarios}/>}
    </div>
  )
}

export default RecursoReserva