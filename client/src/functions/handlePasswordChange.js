export const handlePasswordChange = async(values,navigate,setDialog) => {
    let response = await fetch('http://localhost:4000/changePassword',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            password : values.password,
            confirmPassword : values.confirmPassword
        })
    })
    response = await response.json()
    if(response.server_message.status === 'success'){
        console.log('success');
        navigate('/')
    }else{
        setDialog({
            state : true,
            value : response.server_message.status
        })
    }
}