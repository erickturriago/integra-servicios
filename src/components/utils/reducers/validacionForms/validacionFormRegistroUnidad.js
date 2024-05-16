
export const validarUnidadForm = (formData) => {
    const errors = {};
  
    console.log(formData)
  
    // Nombre validacion
    if (!formData.nombre || formData.nombre.trim() === '') {
      errors.nombre = 'Nombre es requerido.';
    } else if (formData.nombre.length < 3) {
      errors.nombre = 'Nombre debe tener al menos 3 caracteres';
    }
  
    //Unidad validacion
    if (!formData.unidad || formData.unidad === undefined) {
      errors.unidad = 'Debe seleccionar una unidad';
    }
  
    if(formData.horarioDisponible.every((horario)=>horario==null)){
      errors.horario = 'Debe especificar al menos un horario'
    }
    
    //Horarios validación
    formData.horarioDisponible.forEach(horario => {
      if(horario.horaInicio == '' || horario.horaFin == ''){
        errors.horario = 'Debe especificar hora de inicio y fin'
      }
    });
  
  
      return errors;
    };