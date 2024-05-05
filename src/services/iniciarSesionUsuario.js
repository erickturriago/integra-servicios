const ENDPOINT=`${import.meta.env.VITE_API_URL}/usuarios/iniciarSesion`

export default function inicioSesion(data) {

  console.log(JSON.stringify(data));

  return fetch(`${ENDPOINT}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(async res => {
    console.log(res)
    const responseData = await res.json();
    console.log(responseData)
    if (!res.ok) {
      throw new Error(responseData.message || "Error en la solicitud");
    }
    return { success: true, responseData };
  }).catch(error => {
    return { success: false, error: error.message };
  });
}