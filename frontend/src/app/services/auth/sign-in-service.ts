const URL_API_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

if(!URL_API_BACKEND){
  throw new Error(
    'Variável url_backend não foi resgatada do env'
  )
}

export const signInService = async (data: signType) => {

  const userAuth = await fetch(`${URL_API_BACKEND}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': data.email,
      'password': data.password
    })
  })


  return userAuth.json();

}