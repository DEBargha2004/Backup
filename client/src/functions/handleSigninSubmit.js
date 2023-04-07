async function handleSigninSubmit({email,password},setLoggedin,setAppData,setOpen) {
  let response = await fetch('http://localhost:4000/signin',{
    method:'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      emailid : email,
      password
    }),
    credentials:'include',
  })
  response = await response.json()
  if(response.server_message.status === 'success'){
    setLoggedin(true)
    setAppData(response.server_message.data)
  }else{
    setOpen({
      status : true,
      value : response.server_message.status
    })
  }

}

export default handleSigninSubmit;