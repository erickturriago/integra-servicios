const ENDPOINT=`${import.meta.env.VITE_API_URL}/usuarios/iniciarSesion`

export default function inicioSesion (data) {

  console.log(JSON.stringify(data))


  return fetch(`${ENDPOINT}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok){
        return false;
    }
    return true;
  })
}