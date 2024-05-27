
export const validarReservaForm = (formData,recursoReservar) => {
    const errors = {};

    console.log(formData)
    console.log(recursoReservar)

    // Validar si la fecha no es vacia
    if (!formData.fechaCreacion || formData.fechaCreacion.trim() === '') {
        errors.fechaCreacion = 'Nombre es requerido.';
    }

    const fechaCompararDate = new Date(formData.fechaCreacion);
    fechaCompararDate.setDate(fechaCompararDate.getDate()+1);
    fechaCompararDate.setHours(0, 0, 0, 0);

    const fechaActualDate = new Date(new Date().getTime() - (5 * 60 * 60 * 1000));
    fechaActualDate.setHours(0, 0, 0, 0);

    //Validar si la fecha no es antes del presente
    if (fechaCompararDate < fechaActualDate) {
        errors.fechaCreacion = 'La fecha no puede ser anterior antes de hoy';  
    }

    const diasRecurso = recursoReservar.horarioDisponible.map((horario)=>horario.dia.id);
    let diaSeleccionado = fechaCompararDate.getDay();
    if(diaSeleccionado == 0){
        diaSeleccionado=7;
    }

    console.log(fechaCompararDate.getDay())
    console.log(diaSeleccionado)
    //Validar si el recurso está disponible el día seleccionado
    if(!diasRecurso.includes(diaSeleccionado)){
        errors.fechaCreacion = 'Recurso no disponible el día seleccionado';  
    }


    //Validacion de horas
    //Horarios validación
    const horaInicioDate = new Date();
    horaInicioDate.setHours(formData.horaInicio.split(':')[0], formData.horaInicio.split(':')[1], 0);
    const horaFinDate = new Date();
    horaFinDate.setHours(formData.horaFin.split(':')[0], formData.horaFin.split(':')[1], 0);
    // Comparar las horas
    if(!errors.fechaCreacion){
        if(formData.horaInicio == '' || formData.horaFin == ''){
            errors.horario = 'Debe especificar hora de inicio y fin.';
        }
        if (horaFinDate < horaInicioDate) {
            errors.horario = 'La hora de fin no puede ser antes de la hora inicio.';
        }
    }


    return errors;
};





const formatearFecha = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
};