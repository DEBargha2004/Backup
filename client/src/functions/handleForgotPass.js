export const handleForgotPass = async(values,setChange,setOtpExpired,setTime,setDialog) => {
    console.log('from handleforgotpass');
    let response = await fetch('http://localhost:4000/forgotpass',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            emailid : values.email
        })
    })
    response = await response.json()
    if(response.server_message.status === 'success'){
        setChange(true)
        setOtpExpired(false)
        setTime(300)
    }else{
        setDialog({
            state : true,
            value : response.server_message.status
        })
    }
}