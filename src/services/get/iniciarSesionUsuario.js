const ENDPOINT=`${import.meta.env.VITE_API_URL}/auth/login`

export default function inicioSesion(data) {

  console.log(JSON.stringify(data));

  return fetch(`${ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(async res => {
      const token = res.headers.get('Authorization')//.replace('Bearer ',"");
      const responseData = await res.json()
      console.log(responseData)

      if (!res.ok) {
        throw new Error("Error en la solicitud");
      }

      localStorage.setItem('token',token)
      return { success: true, token ,responseData};
  }).catch(error => {
    return { success: false, error: error.message };
  });
}