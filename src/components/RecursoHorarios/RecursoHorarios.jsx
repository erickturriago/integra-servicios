import './RecursoHorarios.css'
const RecursoHorarios = ({showHorarios,setShowHorarios}) => {
  return (
    <div className='containerHoras'>
        <div className='horas'>
          <span>7:00 AM</span>
          <span>9:00 AM</span>
          <span>12:00 PM</span>
          <span>7:00 PM</span>
        </div>
        <div className='saveDiv'>
          <button onClick={()=>setShowHorarios(!showHorarios)}>Enviar</button>
        </div>
    </div>
  )
}

export default RecursoHorarios