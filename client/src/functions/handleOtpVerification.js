export const handleOtpVerification = async(values,setAllowPass,emailID,setDialog) => {
    let response = await fetch('http://localhost:4000/otpchannel',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            otp : values.otp,
            emailID
        })
    })
    response = await response.json()
    if(response.server_message.status === 'success'){
        setAllowPass(true)
    }else{
        setDialog({
            state : true,
            value : response.server_message.status
        })
    }
}