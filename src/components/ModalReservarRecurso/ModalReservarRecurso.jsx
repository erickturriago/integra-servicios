import React, { useEffect, useState } from 'react'
import './ModalReservarRecurso.css'
import { registrarReserva } from '../../services/post/registrarReserva';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { validarRecursoForm } from '../utils/validacionForms/validacionFormRegistroRecurso';
import { actualizarRecurso } from '../../services/update/actualizarRecurso';
import getReservasRecurso from '../../services/get/getReservasRecurso';

const ModalReservarRecurso = ({ setShowModalReservarRecurso, recursoReservar, reload, setReload }) => {
    const [errors, setErrors] = useState({});
    const { state, dispatch } = useIntegraStates()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [reservasRecurso, setReservasRecurso] = useState([])
    const [horasFin, setHorasFin] = useState([])
    const [horasInicio, setHorasInicio] = useState([])
    const timeZone = 'America/Bogota'

    const [formData, setFormData] = useState({
        idRecurso: recursoReservar.id,
        idUsuario: state.userData.id,
        estado: 'Activa',
        fechaInicio: undefined,
        fechaFin: undefined,
        fechaCreacion: undefined,
        horaInicio: undefined,
        horaFin: undefined,
        fechaDevolucion: null
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        console.log(`formData: ${JSON.stringify(formData)}`)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        setFormData({ ...formData, 'fechaCreacion': new Date().toISOString() })
        console.log(formData.fechaCreacion)
        registrarReserva(formData)
            .then((response) => {
                if (response.succes) {
                    console.log(response)
                    setShowModalReservarRecurso(false)
                    setReload(!reload)
                }
            })
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

    const formatDate = (date, timeZone) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: timeZone
        };
        return new Intl.DateTimeFormat('es-CO', options).format(date);
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
        console.log(`reservas: ${JSON.stringify(reservas)}`)
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
                    <div className={errors.horario ? 'error-field' : ''}>
                        <div className='containerCalendar'>
                            <label htmlFor="">Horario</label>
                            <input type="date" value={currentDate.toISOString().split('T')[0]} onChange={(e) => { setCurrentDate(new Date(e.target.valueAsDate.getTime() + (300 * 60 * 1000))); setFormData({ ...formData, fechaInicio: e.target.value, fechaFin: e.target.value }) }} />
                        </div>
                        {recursoReservar.horarioDisponible.some(horario => horario.dia.id === currentDate.getDay()) && <div className='horasDisponible'>
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
                    <div>
                        <button className='btn-signin'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalReservarRecurso