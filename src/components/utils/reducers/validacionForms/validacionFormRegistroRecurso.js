
export const validarRecursoForm = (formData) => {
  const errors = {};

  console.log(formData)

  // Nombre validacion
  if (!formData.nombre || formData.nombre.trim() === '') {
    errors.nombre = 'Nombre es requerido.';
  } else if (formData.nombre.length < 3) {
    errors.nombre = 'Nombre debe tener al menos 3 caracteres';
  }

  // Tipo validacion
  if (!formData.tipo || formData.tipo.trim() === '') {
    errors.tipo = 'Tipo es requerido.';
  }

  // Tipo validacion
  if (!formData.tipo || formData.tipo.trim() === '') {
    errors.tipo = 'Tipo es requerido.';
  }

  // Apertura validacion
  if (!formData.horaInicio || formData.horaInicio.trim() === '') {
    errors.horario = 'Hora de apertura es requerida.';
  }
  // Cierre validacion
  if (!formData.horaFinal || formData.horaFinal.trim() === '') {
    errors.horario = 'Hora de cierre es requerida.';
  }
  // Apertura y cierre validación
  if (formData.horaInicio.trim() === '' && formData.horaFinal.trim() === '') {
    errors.horario = 'Falta hora de apertura y cierre';
  }

  // Minimo validacion
  if (formData.tiempoMinimo == 0) {
    errors.prestamo = 'Tiempo minimo es requerido.';
  }
  // Maximo validacion
  if (formData.tiempoMaximo == 0) {
    errors.prestamo = 'Tiempo maximo es requerido';
  }
  if (formData.tiempoMinimo == 0 && formData.tiempoMaximo == 0) {
    errors.prestamo = 'Falta tiempo minimo y maximo';
  }


  // Validacion dias
  if (formData.diasDisponibles.length < 1) {
    errors.dias = 'Debe seleccionar al menos un día.';
  }


    return errors;
  };