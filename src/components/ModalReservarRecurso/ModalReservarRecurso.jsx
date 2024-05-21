import React, { useEffect, useState } from 'react'
import './ModalReservarRecurso.css'
import getUnidades from '../../services/get/getUnidades';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { validarRecursoForm } from '../utils/validacionForms/validacionFormRegistroRecurso';
import { actualizarRecurso } from '../../services/update/actualizarRecurso';

const ModalReservarRecurso = ({setShowModalReservarRecurso,recursoReservar,reload,setReload}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        unidad:undefined,
        recurso:undefined,
        horarioDisponible:[]
    });
    const [errors, setErrors] = useState({});
    const {state, dispatch} = useIntegraStates()
    const [unidad,setUnidad] = useState(undefined)
    const [diasUnidad,setDiasUnidad] = useState([])
    const [diasSeleccionados,setDiasSeleccionados] = useState([])
    const [date, setDate] = useState(new Date())
    const [horaInicio, setHoraInicio] = useState(undefined)
    const timeZone = 'America/Bogota'

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validarRecursoForm(formData);
        console.log(validationErrors)
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(formData)
            actualizarRecurso(formData)
                .then((response) => {
                    if(response.succes){
                        console.log(response)
                        setShowModalReservarRecurso(false)
                        setReload(!reload)
                    }
                }) 
        }
    };

    const handleUnidad = (e)=>{
        let unidadSeleccionada = e.target.value;
        const unidadFiltrada = state.unidadesList.find((u)=>u.nombre==unidadSeleccionada);
        setFormData({ ...formData, unidad:unidadFiltrada.id,horarioDisponible:[]});
        setDiasUnidad(unidadFiltrada.diasDisponibles)
        setUnidad(unidadFiltrada)
        setDiasSeleccionados([])
    }

    const handleDia = (e)=>{
        let dia = e.target.textContent ;
        if(!diasSeleccionados.includes(dia)){
            setDiasSeleccionados([...diasSeleccionados,dia])
            formData.horarioDisponible.push({
                dia:getNumeroDia(dia),
                horaInicio:"",
                horaFin:""
            })
        }
        else{
            setDiasSeleccionados(diasSeleccionados.filter((d)=>d!==dia))
            formData.horarioDisponible = formData.horarioDisponible.filter((horario)=>horario.dia!==getNumeroDia(dia))
        }
    }

    const handleChangeHoraInicio = (e,infoDia)=>{
        let valorHora = e.target.value;
        infoDia.horaInicio=valorHora;
    }

    const handleChangeHoraFin = (e,infoDia)=>{
        let valorHora = e.target.value;
        infoDia.horaFin=valorHora;
    }

    const getNumeroDia = (diaTexto)=>{
        let diaNumero = 0
        switch(diaTexto){
            case 'Domingo': diaNumero = 0; break;
            case 'Lunes': diaNumero = 1; break;
            case 'Martes': diaNumero = 2; break;
            case 'Miércoles': diaNumero = 3; break;
            case 'Jueves': diaNumero = 4; break;
            case 'Viernes': diaNumero = 5; break;
            case 'Sábado': diaNumero = 6; break;
        }
        return diaNumero;
    }

    const getNombreDia = (diaNumero)=>{
        let diaNombre = ''
        switch(diaNumero){
            case 0: diaNombre = 'Domingo'; break;
            case 1: diaNombre = 'Lunes'; break;
            case 2: diaNombre = 'Martes'; break;
            case 3: diaNombre = 'Miércoles'; break;
            case 4: diaNombre = 'Jueves'; break;
            case 5: diaNombre = 'Viernes'; break;
            case 6: diaNombre = 'Sábado'; break;
        }
        return diaNombre;
    }

    const formatDate = (date, timeZone) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: timeZone
        };
        return new Intl.DateTimeFormat('es-CO', options).format(date);
      };

    const generarListaHorario = (tipo)=>{
        console.log(recursoReservar)
        var inicio = new Date('2000-01-01T' + unidad.horaInicio);
        var fin = new Date('2000-01-01T' + unidad.horaFinal);

        var horarios = [];
        if(tipo=='inicio'){
            var hora = inicio;
            while (hora <= fin) {
                var horaActual = hora.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                horarios.push(horaActual);

                hora.setMinutes(hora.getMinutes() + unidad.tiempoMinimo);
            }
            horarios.pop()
        }
        var tiempoSuma = unidad.tiempoMinimo
        if(tipo=='fin' && horaInicio){
            var hora = horaInicio + tiempoSuma
            while(hora <=fin && tiempoSuma != unidad.tiempoMaximo){
                var horaActual = hora.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
                horarios.push(horaActual);
                hora.setMinutes(hora.getMinutes() + tiempoSuma)
            }
        }
        return horarios
    }

    const setHorarioDefault = ()=>{
        let horario = []
        unidad.diasDisponibles.forEach((dia)=>{
            horario.push({
                dia:dia.id,
                horaInicio:unidad.horaInicio,
                horaFin:unidad.horaFinal
            })
        })
        setFormData({...formData,['horarioDisponible']:horario})
        setDiasSeleccionados(unidad.diasDisponibles.map((dia)=>dia.nombre));
    }

    useEffect(() => {
        
        getUnidades()
        .then((response) => {
            if(response.succes){
                dispatch({type:'SET_LIST_UNIDADES',payload:response.responseData})
            }
        }) 

        let recursoEntrada = {
            nombre : recursoReservar.nombre,
            unidad:recursoReservar.unidad.id,
            horarioDisponible:[],
            id:recursoReservar.id
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            ...recursoEntrada,
          }));

        setDiasUnidad(recursoReservar.unidad.diasDisponibles)
        setUnidad(recursoReservar.unidad)
        setDiasSeleccionados(recursoReservar.horarioDisponible.map((horario)=>horario.dia.nombre))

        let horarioArr= []
        console.log(recursoReservar.horarioDisponible)
        recursoReservar.horarioDisponible.forEach((horario)=>{
            console.log(horario)
            // console.log(dia)
            horarioArr.push({
                dia:horario.dia.id,
                horaInicio:horario.horaInicio,
                horaFin:horario.horaFin
            })
        })
        console.log(horarioArr)
        setFormData((prevFormData) => ({
            ...prevFormData,
            horarioDisponible: horarioArr,
          }));

        console.log(formData)
        

    }, [])


    return (
    <div className='background-modal'>
        <div className='containerForm'>
            <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={()=>setShowModalReservarRecurso(false)}/>
            <h3>Reservar Recurso</h3>
            {/* <FontAwesomeIcon icon={faXmark} /> */}
            <form action="" onSubmit={handleSubmit}>
                <div className={errors.nombre ? 'error-field' : ''}>
                    <label htmlFor="">Nombre</label>
                    <h5>{recursoReservar.nombre}</h5>
                </div>
                <div className={errors.unidad ? 'error-field' : ''}>
                    <label htmlFor="">Unidad</label>
                    <h5>{recursoReservar.unidad.nombre}</h5>
                </div>
                { unidad && <div className={errors.horario ? 'error-field' : ''}>
                    <label htmlFor="">Horario <span className='btn-default' onClick={setHorarioDefault}>Default</span></label>
                    <input type="date" value={date.toISOString().split('T')[0]} onChange={(e) => setDate(new Date(e.target.value))}/>
                    {recursoReservar.horarioDisponible.some(horario => horario.dia.id === date.getDay()) && <div className='horasDisponible'>
                        <div>
                            <span>{getNombreDia(date.getDay())}</span>
                            <select name="" id="" onChange={(e)=>{setHoraInicio(e.target.value)}}>
                            {generarListaHorario('inicio').map((horario,index)=>{
                                return(
                                    <option key={index} >{horario}</option>
                                )
                            })}
                            </select>
                            :
                            <select name="" id="">
                            {generarListaHorario('fin').map((horario,index)=>{
                                return(
                                    <option key={index}>{horario}</option>
                                )
                            })}
                            </select>
                        </div>
                    </div>}
                </div>}
                <div>
                    <button className='btn-signin'>Guardar</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default ModalReservarRecurso