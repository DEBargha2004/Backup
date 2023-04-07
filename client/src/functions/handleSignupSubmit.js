async function handleSignupSubmit({firstname,lastname,email,password},setLoggedin,setOpen,navigate){
    console.log('signup button clicked');
    let response = await fetch('http://localhost:4000/signup',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            firstname,
            lastname,
            emailid : email,
            password
        })
    })
    response = await response.json()
    if(response.server_message.status === 'success'){
        setLoggedin(true)
        navigate('/')
    }else{
        console.log(response.server_message);
        setOpen({
            status : true,
            value : response.server_message.status
        })
    }
}

export default handleSignupSubmit;