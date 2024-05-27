import React, { useEffect, useState } from 'react'
import './ModalReservarRecurso.css'
import { registrarReserva } from '../../services/post/registrarReserva';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { validarReservaForm } from '../utils/validacionForms/validacionFormRegistroReserva';
import { actualizarRecurso } from '../../services/update/actualizarRecurso';
import getReservasRecurso from '../../services/get/getReservasRecurso';

const ModalReservarRecurso = ({ setShowModalReservarRecurso, recursoReservar, reload, setReload }) => {
    const [errors, setErrors] = useState({});
    const { state, dispatch } = useIntegraStates()
    const [currentDate, setCurrentDate] = useState(undefined)
    const [reservasRecurso, setReservasRecurso] = useState([])
    const [horasFin, setHorasFin] = useState([])
    const [horasInicio, setHorasInicio] = useState([])
    const timeZone = 'America/Bogota'

    const [formData, setFormData] = useState({
        idRecurso: recursoReservar.id,
        idUsuario: state.userData.id,
        estado: 'Activa',
        fechaCreacion: undefined,
        horaInicio: '',
        horaFin: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        console.log(`formData: ${JSON.stringify(formData)}`)
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validarReservaForm(formData,recursoReservar);
        console.log(validationErrors)
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            registrarReserva(formData)
            .then((response) => {
                if (response.succes) {
                    console.log(response)
                    setShowModalReservarRecurso(false)
                    setReload(!reload)
                }
            })
        }
    };

    const getNumeroDia = (diaTexto) => {
        let diaNumero = 0
        switch (diaTexto) {
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

    const getNombreDia = (diaNumero) => {
        let diaNombre = ''
        switch (diaNumero) {
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

    const formatearFecha = (fecha) => {
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    };

    const generarListaHorario = (tipo) => {
        var inicio = new Date('2000-01-01T' + recursoReservar.unidad.horaInicio);
        var fin = new Date('2000-01-01T' + recursoReservar.unidad.horaFinal);
        let reservas = []
        for (let reserva of reservasRecurso) {
            let date = new Date(new Date(reserva.fechaInicio).getTime() + (300 * 60 * 1000))
            if (currentDate.getFullYear() === date.getFullYear() &&
                currentDate.getMonth() === date.getMonth() &&
                currentDate.getDate() === date.getDate()) {
                reservas.push({ horaInicio: reserva.horaInicio, horaFin: reserva.horaFin })
            }
        }
        // console.log(`reservas: ${JSON.stringify(reservas)}`)
        var horarios = [];
        if (tipo == 'inicio') {
            let hora = inicio;
            //alert(hora)
            while (hora <= fin) {
                var horaActual = hora.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                if (!reservas.some(reserva => reserva.horaInicio == horaActual.replace(' ', ''))) {
                    horarios.push(horaActual)
                } else {
                    let reserva = reservas.find(reserva => reserva.horaInicio == horaActual.replace(' ', ''))
                    hora.setHours(reserva.horaFin.split(':')[0])
                    hora.setMinutes(reserva.horaFin.split(':')[1] - recursoReservar.unidad.tiempoMinimo)
                }
                hora.setMinutes(hora.getMinutes() + recursoReservar.unidad.tiempoMinimo);
            }
            horarios.pop()
        }
        if (tipo == 'fin' && formData.horaInicio) {
            let tiempoSuma = recursoReservar.unidad.tiempoMinimo
            let hora = new Date('2000-01-01T' + formData.horaInicio)
            hora.setMinutes(hora.getMinutes() + tiempoSuma)
            while (hora <= fin && tiempoSuma <= recursoReservar.unidad.tiempoMaximo) {
                let horaActual = hora.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
                if (!formData.horaFin) {
                    setFormData({ ...formData, 'horaFin': horaActual })
                }
                horarios.push(horaActual);
                hora.setMinutes(hora.getMinutes() + recursoReservar.unidad.tiempoMinimo)
                tiempoSuma += recursoReservar.unidad.tiempoMinimo
                if (reservas.some(reserva => reserva.horaInicio == horaActual.replace(' ', ''))) {
                    break
                }
            }
        }
        console.log(recursoReservar)
        return horarios
    }

    useEffect(() => {
        getReservasRecurso(recursoReservar.id)
            .then((response) => {
                if (response.succes) {
                    setReservasRecurso(response.responseData)
                }
            })
        console.log(`formData: ${formData}`)
    }, [horasInicio])

    useEffect(()=>{
        console.log("useEffect current date");
        console.log(recursoReservar);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Ajusta la hora a medianoche para evitar diferencias de zona horaria
        setCurrentDate(new Date(formatearFecha(hoy)));
        setFormData({ ...formData, 'fechaCreacion':formatearFecha(hoy)})
        console.log(formatearFecha(hoy));

    },[reservasRecurso])


    return (
        <div className='background-modal'>
            <div className='containerForm'>
                <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={() => setShowModalReservarRecurso(false)} />
                <h3>Reservar Recurso</h3>
                {/* <FontAwesomeIcon icon={faXmark} /> */}
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Nombre</label>
                        <h5>{recursoReservar.nombre}</h5>
                    </div>
                    <div>
                        <label htmlFor="">Unidad</label>
                        <h5>{recursoReservar.unidad.nombre}</h5>
                    </div>
                    <div className={errors.fechaCreacion ? 'error-field' : ''}>
                        <div className='containerCalendar'>
                            <label htmlFor="">Fecha</label>
                            {currentDate && <input type="date" value={currentDate.toISOString().split('T')[0]} onChange={(e) => { setCurrentDate(new Date(e.target.valueAsDate.getTime() + (300 * 60 * 1000)));setFormData({ ...formData, 'fechaCreacion': formatearFecha(new Date(e.target.valueAsDate.getTime() + (300 * 60 * 1000)) )})}} />}
                        </div>
                        {errors.fechaCreacion && <span className="error-message">{errors.fechaCreacion}</span>}
                    </div>
                    <div className={errors.fechaCreacion ? 'error-field' : ''}>
                        <div className='containerCalendar'>
                            <label htmlFor="">Horario</label>
                            {currentDate && recursoReservar.horarioDisponible.some(horario => horario.dia.id === currentDate.getDay()) && 
                            <div className='horasDisponible'>
                                <div>
                                    <span>{getNombreDia(currentDate.getDay())}</span>
                                    <select name="horaInicio" id="" onChange={(e) => handleChange(e)}>
                                        {generarListaHorario('inicio').map((horario, index) => {
                                            if (!formData.horaInicio && index === 0) {
                                                setFormData({ ...formData, 'horaInicio': horario })
                                            }
                                            return (
                                                <option key={index} >{horario}</option>
                                            )
                                        })}
                                    </select>
                                    :
                                    <select name="horaFin" id="" onChange={(e) => handleChange(e)}>
                                        {generarListaHorario('fin').map((horario, index) => {
                                            return (
                                                <option key={index}>{horario}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>}
                        </div>
                        {errors.horario && <span className="error-message">{errors.horario}</span>}
                    </div>
                    <div>
                        <button className='btn-signin'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalReservarRecurso