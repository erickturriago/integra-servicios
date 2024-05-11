import React, { useEffect, useState } from 'react'
import './ModalRecurso.css'
import getUnidades from '../../services/get/getUnidades';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons'

const ModalRecurso = ({setShowModal}) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        contraseña: '',
        cedula: '',
    });
    const [errors, setErrors] = useState({});
    const {state, dispatch} = useIntegraStates()
    const [unidad,setUnidad] = useState(undefined)
    const [diasUnidad,setDiasUnidad] = useState([])
    const [diasSeleccionados,setDiasSeleccionados] = useState([])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
    
    };

    const handleUnidad = (e)=>{
        let unidadSeleccionada = e.target.value;
        const unidadFiltrada = state.unidadesList.find((u)=>u.nombre==unidadSeleccionada);

        setDiasUnidad(unidadFiltrada.diasDisponibles)
        setUnidad(unidadFiltrada)
        setDiasSeleccionados([])
    }

    const handleDia = (e)=>{
        let dia = e.target.textContent ;
        if(!diasSeleccionados.includes(dia)){
            setDiasSeleccionados([...diasSeleccionados,dia])
        }
        else{
            setDiasSeleccionados(diasSeleccionados.filter((d)=>d!==dia))
        }
    }

    const generarListaHorario = (tipo)=>{
        // Convertir las horas de inicio y fin a objetos Date
        var inicio = new Date('2000-01-01T' + unidad.horaInicio);
        var fin = new Date('2000-01-01T' + unidad.horaFinal);

        var horarios = [];

        // Comenzar desde la hora de inicio y agregar cada hora hasta la hora de fin
        var hora = inicio;
        while (hora <= fin) {
            // console.log(hora)
            // Convertir la hora actual a formato HH:mm
            var horaActual = hora.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
            horarios.push(horaActual);

            // Agregar el tiempo mínimo para la próxima iteración
            hora.setMinutes(hora.getMinutes() + unidad.tiempoMinimo);
        }

        if(tipo=='fin'){
            horarios.shift()
            return horarios;
        }
        horarios.pop()
        return horarios;
    }

    useEffect(() => {
        getUnidades()
        .then((response) => {
            if(response.succes){
                dispatch({type:'SET_LIST_UNIDADES',payload:response.responseData})
            }
        }) 
    }, [])


    return (
    <div className='background-modal'>
        <div className='containerForm'>
            <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={()=>setShowModal(false)}/>
            <h3>Registrar Recurso</h3>
            {/* <FontAwesomeIcon icon={faXmark} /> */}
            <form action="" onSubmit={handleSubmit}>
                <div className={errors.fullname ? 'error-field' : ''}>
                    <label htmlFor="">Nombre</label>
                    <input
                    type="text"
                    placeholder='Fullname'
                    // value={formData.fullname}
                    onChange={handleChange}
                    name="Nombre"
                    />
                    {errors.fullname && <span className="error-message">{errors.fullname}</span>}
                </div>
                <div className={errors.contraseña ? 'error-field' : ''}>
                    <label htmlFor="">Tipo</label>
                    <select name="" id="">
                        <option defaultValue hidden>Seleccionar</option>
                        <option value="1">Deportivo</option>
                        <option value="2">Aula</option>
                        <option value="3">Recreativo</option>
                    </select>
                    {errors.contraseña && <span className="error-message">{errors.email}</span>}
                </div>
                <div className={errors.contraseña ? 'error-field' : ''}>
                    <label htmlFor="">Unidad</label>
                    <select onChange={handleUnidad} name="" id="">
                        <option defaultValue hidden>Seleccionar</option>
                        {state.unidadesList.map((unidad)=>{
                            return(
                                <option key={unidad.id}>{unidad.nombre}</option>
                            )
                        })}
                    </select>
                    {errors.contraseña && <span className="error-message">{errors.email}</span>}
                </div>
                { unidad && <div className={errors.contraseña ? 'error-field' : ''}>
                    <label htmlFor="">Horario</label>
                    <div className='diasDisponible'>
                        {diasUnidad.map((dia)=>{
                            return (
                                <span onClick={handleDia} key={dia.id} className={diasSeleccionados.filter((d)=>d==dia.nombre).length>0?'diaSeleccionado':''}>{dia.nombre}</span>
                            )
                        })}
                    </div>
                    {diasSeleccionados.length>0 && <div className='horasDisponible'>
                        {diasSeleccionados.map((dia,index)=>{
                            return(
                                <div key={index}>
                                    <span key={index}>{dia}</span>
                                    <select name="" id="">
                                        <option defaultValue hidden>Inicio</option>
                                        {generarListaHorario('inicio').map((horario,index)=>{
                                            return(
                                                <option key={index}>{horario}</option>
                                            )
                                        })}
                                    </select>
                                    :
                                    <select name="" id="">
                                        <option defaultValue hidden>Fin</option>
                                        {generarListaHorario('fin').map((horario,index)=>{
                                            return(
                                                <option key={index}>{horario}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )
                        })}
                    </div>}
                </div>}
                <div>
                    <button className='btn-signin'>Registrar</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default ModalRecurso