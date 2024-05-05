const ENDPOINT=`${import.meta.env.VITE_API_URL}/usuarios/registrar`

export function registrarUsuario (data) {

  const hoy = new Date();

  // Obtener el año, mes y día
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
  const dia = String(hoy.getDate()).padStart(2, '0');

  // Formatear la fecha en el formato YYYY-MM-DD
  const fechaHoy = `${año}-${mes}-${dia}`;

  const dataCompleta = {...data,fechaRegistro:fechaHoy,rol:'2'}

  console.log(JSON.stringify(dataCompleta))


  return fetch(`${ENDPOINT}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataCompleta)
  }).then(res => {
    if (!res.ok) throw new Error('Response is NOT ok')
    return true;
  })
}